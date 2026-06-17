from scanners.security_group_scanner import (
    scan_security_groups
)

from scanners.iam_scanner import (
    scan_iam_users
)

from scanners.s3_scanner import (
    scan_s3_buckets
)


def run_all_scanners():

    findings = []

    findings.extend(
        scan_security_groups()
    )

    findings.extend(
        scan_iam_users()
    )

    findings.extend(
        scan_s3_buckets()
    )

    return findings