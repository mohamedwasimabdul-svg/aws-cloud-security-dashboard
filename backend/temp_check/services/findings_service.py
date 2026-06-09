import os
import uuid
from datetime import datetime

import boto3


TABLE_NAME = os.environ["FINDINGS_TABLE"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def save_finding(finding):

    item = {
        "finding_id": str(uuid.uuid4()),
        "severity": finding["severity"],
        "resource_type": finding["resource_type"],
        "resource_id": finding["resource_id"],
        "title": finding["title"],
        "description": finding["description"],
        "created_at": datetime.utcnow().isoformat()
    }

    table.put_item(Item=item)