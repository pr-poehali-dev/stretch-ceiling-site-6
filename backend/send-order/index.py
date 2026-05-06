import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку на замер на email potolkileko1@gmail.com"""

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

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'potolkileko1@gmail.com'
    to_email = 'potolkileko1@gmail.com'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на замер от {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7C3AED;">Новая заявка на замер</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; width: 120px;">Имя</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">Телефон</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">{phone}</td>
        </tr>
        {"<tr><td style='padding: 10px; color: #666;'>Комментарий</td><td style='padding: 10px;'>" + comment + "</td></tr>" if comment else ""}
      </table>
      <p style="color: #999; font-size: 12px; margin-top: 20px;">Заявка с сайта potolkileko</p>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }