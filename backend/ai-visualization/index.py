import json
import os
import base64
import uuid
import boto3
import requests


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

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors_headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    image_data = body.get('image', '')
    style = body.get('style', '')

    if not image_data or not style:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нужно фото комнаты и стиль потолка'}, ensure_ascii=False)}

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

    api_key = os.environ['OPENAI_API_KEY']
    ext = mime.split('/')[-1] or 'png'

    resp = requests.post(
        'https://api.openai.com/v1/images/edits',
        headers={'Authorization': f'Bearer {api_key}'},
        files={'image': (f'room.{ext}', image_bytes, mime)},
        data={'model': 'gpt-image-1', 'prompt': prompt, 'size': '1024x1024'},
        timeout=90,
    )

    if resp.status_code != 200:
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

    return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'url': cdn_url}, ensure_ascii=False)}
