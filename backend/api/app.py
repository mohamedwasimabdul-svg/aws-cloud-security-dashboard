import json

from services.findings_query_service import (
    get_all_findings
)

from services.summary_service import (
    get_summary
)


def build_response(data):

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*"
        },
        "body": json.dumps(data)
    }


def handler(event, context):

    path = event.get("path", "/")

    if path == "/findings":

        return build_response(
            get_all_findings()
        )

    elif path == "/summary":

        return build_response(
            get_summary()
        )

    return build_response(
        {
            "message":
            "Cloud Security Dashboard API"
        }
    )