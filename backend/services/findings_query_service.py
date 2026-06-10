import os
import boto3

TABLE_NAME = os.environ["FINDINGS_TABLE"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def get_all_findings():

    response = table.scan()

    return response.get("Items", [])