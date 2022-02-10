import boto3
import os
import time
import smtplib
from email.mime.text import MIMEText
import sys

_from = "lambda@my_domain.com"
_to = "me@my_domain.com"
_host = "mail.my_domain.com"

s3 = boto3.client('s3')

dest_bucket = "backup2"

os.environ['TZ'] = 'Europe/London'
time.tzset()

def object_exists(key):
    try:
        s3.get_object(Bucket=dest_bucket, Key=key)
    except Exception as e:
        return False

    return True

def lambda_handler(event, context):
    data_key = time.strftime("%Y-%m-%d") + ".tar.gz.gpg"
    sql_key = time.strftime("%Y-%m-%d.%H") + ".sql.gz.gpg"
    
    for key in [data_key,sql_key]:
        if not object_exists(key):
            
            msg = MIMEText("Backup object not found: " + key)

            msg['Subject'] = 'AWS: backup failed'
            msg['From'] = _from
            msg['To'] = _to

            s = smtplib.SMTP(_host)

            s.sendmail(_from, [_to], msg.as_string())
