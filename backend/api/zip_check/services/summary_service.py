from services.findings_query_service import (
    get_all_findings
)

from services.compliance_service import (
    calculate_score
)


def get_summary():

    findings = get_all_findings()

    critical = len([
        f for f in findings
        if f["severity"] == "CRITICAL"
    ])

    high = len([
        f for f in findings
        if f["severity"] == "HIGH"
    ])

    medium = len([
        f for f in findings
        if f["severity"] == "MEDIUM"
    ])

    low = len([
        f for f in findings
        if f["severity"] == "LOW"
    ])

    return {
        "total_findings": len(findings),
        "critical": critical,
        "high": high,
        "medium": medium,
        "low": low,
        "compliance_score":
            calculate_score(findings)
    }