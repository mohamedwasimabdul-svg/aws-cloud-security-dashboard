# backend/scanners/security_group_scanner.py

import boto3


CRITICAL_PORTS = {
    22: "SSH",
    3389: "RDP",
    3306: "MySQL",
    5432: "PostgreSQL"
}


def scan_security_groups():

    ec2 = boto3.client("ec2")

    findings = []

    response = ec2.describe_security_groups()

    for sg in response["SecurityGroups"]:

        group_id = sg["GroupId"]

        for permission in sg.get("IpPermissions", []):

            from_port = permission.get("FromPort")

            if from_port not in CRITICAL_PORTS:
                continue

            for ip_range in permission.get("IpRanges", []):

                cidr = ip_range.get("CidrIp")

                if cidr == "0.0.0.0/0":

                    findings.append(
                        {
                            "severity": "CRITICAL",
                            "resource_type": "SecurityGroup",
                            "resource_id": group_id,
                            "title": f"{CRITICAL_PORTS[from_port]} Open To Internet",
                            "description": f"Port {from_port} exposed to {cidr}"
                        }
                    )

    return findings