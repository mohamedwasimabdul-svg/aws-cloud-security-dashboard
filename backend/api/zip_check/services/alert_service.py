import os

import boto3


TOPIC_ARN = os.environ["SNS_TOPIC_ARN"]

sns = boto3.client("sns")


def send_alert(finding):

    message = f"""
Severity: {finding['severity']}

Resource Type: {finding['resource_type']}

Resource ID: {finding['resource_id']}

Title:
{finding['title']}

Description:
{finding['description']}
"""

    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject="Cloud Security Dashboard Alert",
        Message=message
    )