import json

from scanners.security_group_scanner import (
    scan_security_groups
)

from services.findings_service import (
    save_finding
)

from services.alert_service import (
    send_alert
)


def lambda_handler(event, context):

    findings = scan_security_groups()

    # Temporary test finding
    # Remove this block later once real findings exist
    if not findings:

        findings.append(
            {
                "severity": "CRITICAL",
                "resource_type": "SYSTEM",
                "resource_id": "TEST",
                "title": "Scanner Connectivity Test",
                "description": "Generated for DynamoDB validation"
            }
        )

    for finding in findings:

        save_finding(finding)

        if finding["severity"] == "CRITICAL":
            send_alert(finding)

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