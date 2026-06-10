import json

from services.findings_query_service import (
    get_all_findings
)

from services.summary_service import (
    get_summary
)


def handler(event, context):

    path = event.get("path", "/")

    if path == "/findings":

        return {
            "statusCode": 200,
            "body": json.dumps(
                get_all_findings()
            )
        }

    elif path == "/summary":

        return {
            "statusCode": 200,
            "body": json.dumps(
                get_summary()
            )
        }

    else:

        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message":
                    "Cloud Security Dashboard API"
                }
            )
        }