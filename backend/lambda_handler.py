import json

from scanners.security_group_scanner import scan_security_groups
from scanners.iam_scanner import scan_iam_users
from scanners.s3_scanner import scan_s3_buckets

from services.findings_service import save_finding
from services.alert_service import send_alert


def lambda_handler(event, context):

    findings = []

    # Security Group Findings
    findings.extend(
        scan_security_groups()
    )

    # IAM Findings
    findings.extend(
        scan_iam_users()
    )

    # S3 Findings
    findings.extend(
        scan_s3_buckets()
    )

    # Temporary test finding
    # Remove later once you have real findings
    if not findings:

        findings.append(
            {
                "severity": "LOW",
                "resource_type": "SYSTEM",
                "resource_id": "TEST",
                "title": "Scanner Connectivity Test",
                "description": "Generated for validation"
            }
        )

    # Persist findings
    for finding in findings:

        save_finding(finding)

        # Alert only for CRITICAL findings
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