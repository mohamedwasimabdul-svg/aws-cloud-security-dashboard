import json

from services.scanner_runner import run_all_scanners
from services.findings_service import save_finding
from services.alert_service import send_alert
from services.compliance_service import calculate_score


def lambda_handler(event, context):

    findings = run_all_scanners()

    for finding in findings:

        save_finding(finding)

        if finding["severity"] == "CRITICAL":
            send_alert(finding)

    score = calculate_score(findings)

    print(f"Security Findings Found: {len(findings)}")
    print(f"Compliance Score: {score}")

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "findings": len(findings),
                "compliance_score": score
            }
        )
    }