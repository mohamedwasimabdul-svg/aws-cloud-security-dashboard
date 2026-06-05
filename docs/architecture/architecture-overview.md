# Architecture Overview

The AWS Cloud Security Dashboard is a serverless cloud security monitoring platform.

Core Components:

- EventBridge Scheduler
- Lambda Security Scanner
- DynamoDB Findings Store
- API Gateway
- React Dashboard
- SNS Alerts

The platform scans AWS resources and stores findings in DynamoDB for centralized reporting and visualization.