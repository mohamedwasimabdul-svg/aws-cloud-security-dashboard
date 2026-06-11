import os
import boto3

TABLE_NAME = os.environ["FINDINGS_TABLE"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def get_historical_findings():

    response = table.scan()

    findings = response.get("Items", [])

    findings.sort(
        key=lambda x: x.get(
            "created_at",
            ""
        ),
        reverse=True
    )

    return findings


def get_all_findings():

    findings = get_historical_findings()

    latest_findings = {}

    for finding in findings:

        key = (
            finding["resource_id"]
            + "|"
            + finding["title"]
        )

        if key not in latest_findings:

            latest_findings[key] = finding

    return list(
        latest_findings.values()
    )