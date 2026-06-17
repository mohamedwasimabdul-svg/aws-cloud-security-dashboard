import boto3

iam = boto3.client("iam")


def scan_iam_users():

    findings = []

    users = iam.list_users()["Users"]

    for user in users:

        username = user["UserName"]

        attached_policies = iam.list_attached_user_policies(
            UserName=username
        )

        for policy in attached_policies[
            "AttachedPolicies"
        ]:

            if (
                policy["PolicyName"]
                == "AdministratorAccess"
            ):

                findings.append(
                    {
                        "severity": "CRITICAL",
                        "resource_type": "IAMUser",
                        "resource_id": username,
                        "title":
                            "Administrator Access Assigned",
                        "description":
                            "User has AdministratorAccess policy"
                    }
                )

    return findings