# backend/lambda_handler.py

import json

from scanners.security_group_scanner import (
    scan_security_groups
)


def lambda_handler(event, context):

    findings = scan_security_groups()

    print(
        f"Security Findings Found: {len(findings)}"
    )

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "findings": len(findings)
            }
        )
    }