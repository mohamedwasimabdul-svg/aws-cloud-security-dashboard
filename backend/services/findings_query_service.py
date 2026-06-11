import os
import boto3

TABLE_NAME = os.environ["FINDINGS_TABLE"]

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)


def get_all_findings():

    response = table.scan()

    findings = response.get("Items", [])

    latest_findings = {}

    for finding in findings:

        key = (
            finding["resource_id"]
            + "|"
            + finding["title"]
        )

        if key not in latest_findings:

            latest_findings[key] = finding

        else:

            current_time = (
                latest_findings[key]
                .get("created_at", "")
            )

            new_time = (
                finding
                .get("created_at", "")
            )

            if new_time > current_time:

                latest_findings[key] = finding

    active_findings = list(
        latest_findings.values()
    )

    active_findings.sort(
        key=lambda x: x.get(
            "created_at",
            ""
        ),
        reverse=True
    )

    return active_findings