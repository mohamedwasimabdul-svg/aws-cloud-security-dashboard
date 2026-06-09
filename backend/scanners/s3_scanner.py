import boto3

from botocore.exceptions import ClientError


s3 = boto3.client("s3")


def scan_s3_buckets():

    findings = []

    buckets = s3.list_buckets()["Buckets"]

    for bucket in buckets:

        bucket_name = bucket["Name"]

        #
        # Encryption Check
        #
        try:

            s3.get_bucket_encryption(
                Bucket=bucket_name
            )

        except ClientError:

            findings.append(
                {
                    "severity": "HIGH",
                    "resource_type": "S3Bucket",
                    "resource_id": bucket_name,
                    "title": "Bucket Encryption Disabled",
                    "description":
                    "Bucket does not have encryption enabled"
                }
            )

        #
        # Versioning Check
        #
        versioning = s3.get_bucket_versioning(
            Bucket=bucket_name
        )

        if versioning.get("Status") != "Enabled":

            findings.append(
                {
                    "severity": "MEDIUM",
                    "resource_type": "S3Bucket",
                    "resource_id": bucket_name,
                    "title": "Bucket Versioning Disabled",
                    "description":
                    "Versioning is not enabled"
                }
            )

    return findings