import json
import os
import base64
import uuid
import urllib.parse
import boto3
import requests
import pg8000.native

MAX_GENERATIONS = 5


def get_conn():
    dsn = os.environ["DATABASE_URL"]
    p = urllib.parse.urlparse(dsn)
    return pg8000.native.Connection(
        user=urllib.parse.unquote(p.username),
        password=urllib.parse.unquote(p.password),
        host=p.hostname,
        port=p.port or 5432,
        database=p.path.lstrip("/"),
        ssl_context=False,
    )


STYLE_PROMPTS = {
    'glossy': 'a modern glossy white stretch ceiling with a mirror-like reflective finish',
    'matte': 'a clean modern matte white stretch ceiling with a smooth even surface',
    'satin': 'an elegant satin-finish stretch ceiling with a soft silky sheen',
    'shadow': 'a modern stretch ceiling with a thin shadow gap along the walls, no visible trim, floating effect',
    'floating': 'a stretch ceiling with a glowing LED-lit gap along the perimeter creating a floating effect',
    'starry': 'a dark stretch ceiling with fiber-optic starry sky effect, small twinkling lights like a night sky',
    'glow': 'a fully backlit glowing stretch ceiling panel that emits soft even white light across the whole surface',
    'multilevel': 'a modern multi-level stretch ceiling with layered geometric shapes and built-in recessed lighting',
    'print': 'a stretch ceiling with an artistic photo print of a blue sky with clouds',
    'colored': 'a vibrant glossy colored stretch ceiling in a stylish accent color that matches the room',
    'track': 'a modern ceiling with a sleek black track lighting system with adjustable spotlight fixtures mounted on a magnetic rail',
    'lines': 'a modern ceiling with thin glowing light line channels integrated into the ceiling surface along the perimeter',
    'cornices': 'a modern ceiling with a built-in hidden curtain cornice, curtains flowing down as if growing directly from the ceiling with no visible rail',
}


def handler(event: dict, context) -> dict:
    """Генерирует AI-визуализацию натяжного потолка в выбранном стиле на основе загруженного фото комнаты"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    cors_headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    method = event.get('httpMethod')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        client_id = (params.get('client_id') or '').strip()
        if not client_id:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'client_id обязателен'}, ensure_ascii=False)}
        conn = get_conn()
        rows = conn.run(
            "SELECT generations_count FROM ai_visualization_usage WHERE client_id = :cid",
            cid=client_id
        )
        conn.close()
        used = rows[0][0] if rows else 0
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'used': used, 'limit': MAX_GENERATIONS, 'remaining': max(0, MAX_GENERATIONS - used)})
        }

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors_headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    image_data = body.get('image', '')
    style = body.get('style', '')
    client_id = (body.get('client_id') or '').strip()

    if not image_data or not style or not client_id:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нужно фото комнаты, стиль потолка и идентификатор клиента'}, ensure_ascii=False)}

    source_ip = (event.get('requestContext', {}) or {}).get('identity', {}).get('sourceIp', '')

    conn = get_conn()
    rows = conn.run(
        "SELECT generations_count FROM ai_visualization_usage WHERE client_id = :cid",
        cid=client_id
    )
    used = rows[0][0] if rows else 0

    if used >= MAX_GENERATIONS:
        conn.close()
        return {
            'statusCode': 403,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Лимит генераций исчерпан', 'used': used, 'limit': MAX_GENERATIONS}, ensure_ascii=False)
        }

    mime = 'image/png'
    if image_data.startswith('data:') and ',' in image_data:
        header, image_data = image_data.split(',', 1)
        if ';base64' in header:
            mime = header[5:].split(';')[0] or mime

    image_bytes = base64.b64decode(image_data)

    style_desc = STYLE_PROMPTS.get(style, 'a modern stylish stretch ceiling')
    prompt = (
        f'Edit this room photo: replace only the ceiling with {style_desc}. '
        'Keep the walls, floor, furniture, windows, lighting fixtures positions and the rest of the room exactly the same. '
        'Make it photorealistic and match the room perspective and lighting.'
    )

    api_key = os.environ['AITUNNEL_API_KEY']
    ext = mime.split('/')[-1] or 'png'

    resp = requests.post(
        'https://api.aitunnel.ru/v1/images/edits',
        headers={'Authorization': f'Bearer {api_key}'},
        files={'image': (f'room.{ext}', image_bytes, mime)},
        data={'model': 'gpt-image-1', 'prompt': prompt, 'size': '1024x1024'},
        timeout=90,
    )

    if resp.status_code != 200:
        conn.close()
        return {
            'statusCode': 502,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Не удалось сгенерировать визуализацию', 'details': resp.text[:500]}, ensure_ascii=False)
        }

    result = resp.json()
    result_b64 = result['data'][0]['b64_json']
    result_bytes = base64.b64decode(result_b64)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    key = f'ai-visualizations/{uuid.uuid4()}.png'
    s3.put_object(Bucket='files', Key=key, Body=result_bytes, ContentType='image/png')
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    new_used = used + 1
    conn.run(
        """
        INSERT INTO ai_visualization_usage (client_id, generations_count, ip_address, updated_at)
        VALUES (:cid, 1, :ip, NOW())
        ON CONFLICT (client_id) DO UPDATE
        SET generations_count = ai_visualization_usage.generations_count + 1,
            ip_address = :ip,
            updated_at = NOW()
        """,
        cid=client_id, ip=source_ip
    )
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'url': cdn_url, 'used': new_used, 'limit': MAX_GENERATIONS, 'remaining': max(0, MAX_GENERATIONS - new_used)}, ensure_ascii=False)
    }