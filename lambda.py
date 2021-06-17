from __future__ import print_function

import json
import urllib
import boto3
import time
import os

s3 = boto3.client('s3')

# Bucket to move uploaded backups to
dest_bucket = "backups2"

# Set the timezone to match your server's timezone
os.environ['TZ'] = 'Europe/London'
time.tzset()

def check_key(key):
    exists = False
    try:
        s3.get_object(Bucket=dest_bucket, Key=key)
        exists = True
    except Exception as e:
        pass

    if exists:
        print('Error: ' + key + ' already exists in destination bucket.')
        raise Exception('error', 'Error: ' + key + ' already exists in destination bucket.')

def lambda_handler(event, context):
    key = urllib.unquote_plus(event['Records'][0]['s3']['object']['key'].encode('utf8'))

    src_bucket = event['Records'][0]['s3']['bucket']['name']
    
    copy_src = {
        'Bucket': src_bucket,
        'Key': key
    }
    
    dest_key = False

    if key == "backup.tar.gz.gpg":
        dest_key = time.strftime("%Y-%m-%d") + ".tar.gz.gpg"

    if key == "sql.gz.gpg":
        dest_key = time.strftime("%Y-%m-%d.%H") + ".sql.gz.gpg"

    if dest_key:
        check_key(dest_key)

        try:
            s3.copy(copy_src, dest_bucket, dest_key)
            s3.delete_object(Bucket=src_bucket, Key=key)

            response = True
        except Exception as e:
            print(e)
            print('Upload failed')
            raise e
    else:
        print('Error: input object did not match requirements for archive.')
        raise('error', 'input object did not match requirements for archive.')
