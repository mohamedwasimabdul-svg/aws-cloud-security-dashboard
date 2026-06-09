import json

from scanners.security_group_scanner import (
    scan_security_groups
)

from services.findings_service import (
    save_finding
)


def lambda_handler(event, context):

    findings = scan_security_groups()

    # Temporary test finding
    if not findings:
        findings.append(
            {
                "severity": "LOW",
                "resource_type": "SYSTEM",
                "resource_id": "TEST",
                "title": "Scanner Connectivity Test",
                "description": "Generated for DynamoDB validation"
            }
        )

    for finding in findings:
        save_finding(finding)

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