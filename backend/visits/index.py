"""
Счётчик посетителей сайта.
GET — возвращает текущее количество.
POST — увеличивает счётчик на 1 и возвращает новое значение.
"""
import os
import json
import pg8000.native

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_conn():
    import urllib.parse
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

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    conn = get_conn()
    method = event.get("httpMethod", "GET")

    if method == "POST":
        rows = conn.run("UPDATE visitor_counter SET count = count + 1 RETURNING count")
        count = rows[0][0]
    else:
        rows = conn.run("SELECT count FROM visitor_counter LIMIT 1")
        count = rows[0][0]

    conn.close()

    return {
        "statusCode": 200,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps({"count": count}),
    }