import json

from services.findings_query_service import (
    get_all_findings,
    get_historical_findings
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

    #
    # Active Findings Endpoint
    #
    if path == "/findings":

        return build_response(
            get_all_findings()
        )

    #
    # Historical Findings Endpoint
    #
    elif path == "/history":

        return build_response(
            get_historical_findings()
        )

    #
    # Summary Metrics Endpoint
    #
    elif path == "/summary":

        return build_response(
            get_summary()
        )

    #
    # Default Endpoint
    #
    return build_response(
        {
            "message":
                "Cloud Security Dashboard API"
        }
    )