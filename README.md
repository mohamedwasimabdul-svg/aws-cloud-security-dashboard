# AWS Cloud Security Dashboard

A serverless cloud security monitoring platform built on AWS that continuously scans cloud resources for security misconfigurations, stores findings in DynamoDB, generates compliance scores, sends alerts through SNS, and visualizes security posture through a React dashboard.

---

## Project Overview

The AWS Cloud Security Dashboard provides automated cloud security monitoring using a fully serverless architecture.

The platform performs scheduled security scans against AWS resources and identifies common security risks including:

* IAM users with AdministratorAccess permissions
* S3 buckets without encryption enabled
* S3 buckets without versioning enabled
* Security Groups exposing critical ports to the public internet

Security findings are stored in DynamoDB and exposed through a REST API. A React dashboard provides real-time visibility into security posture, compliance score, findings history, and security trends.

---

## Key Features

### Automated Security Scanning

* IAM Security Scanner
* S3 Security Scanner
* EC2 Security Group Scanner
* Scheduled scans using EventBridge

### Compliance Monitoring

* Dynamic compliance scoring
* Severity classification
* Active findings tracking
* Historical findings tracking

### Alerting

* SNS email notifications
* Critical finding alerts
* Automated alert generation

### Dashboard

* Security Score Gauge
* Severity Distribution Chart
* Findings by Resource Type
* Historical Findings
* Trend Analytics
* Search and Filtering

---

## AWS Services Used

| Service     | Purpose                                      |
| ----------- | -------------------------------------------- |
| AWS Lambda  | Serverless security scanning and API backend |
| API Gateway | REST API layer                               |
| DynamoDB    | Findings storage                             |
| EventBridge | Scheduled security scans                     |
| SNS         | Security alerts                              |
| S3          | Static website hosting                       |
| IAM         | Access management and security checks        |
| CloudWatch  | Logging and monitoring                       |
| Terraform   | Infrastructure as Code                       |

---

## Architecture

### Dashboard Flow

React Dashboard

↓

S3 Static Website Hosting

↓

API Gateway

↓

API Lambda

↓

DynamoDB

### Security Scanning Flow

EventBridge Schedule

↓

Scanner Lambda

↓

IAM Scanner

S3 Scanner

Security Group Scanner

↓

DynamoDB Findings Storage

↓

SNS Alerts

---

## Security Checks Implemented

### IAM Checks

#### Administrator Access Assigned

Severity: CRITICAL

Detects IAM users with the AWS managed AdministratorAccess policy attached.

---

### S3 Checks

#### Bucket Encryption Disabled

Severity: HIGH

Detects buckets without server-side encryption.

#### Bucket Versioning Disabled

Severity: MEDIUM

Detects buckets without versioning enabled.

---

### Security Group Checks

#### SSH Open To Internet

Severity: CRITICAL

Detects Security Groups exposing port 22 to 0.0.0.0/0.

#### RDP Open To Internet

Severity: CRITICAL

Detects Security Groups exposing port 3389 to 0.0.0.0/0.

#### Database Ports Open To Internet

Severity: CRITICAL

Detects publicly exposed MySQL and PostgreSQL ports.

---

## Compliance Score Calculation

The platform calculates a compliance score based on active findings.

Severity weights:

| Severity | Penalty |
| -------- | ------- |
| Critical | 15      |
| High     | 10      |
| Medium   | 5       |
| Low      | 2       |

Formula:

Compliance Score = 100 - Total Penalties

Minimum score is capped at 0.

---

## Technology Stack

### Backend

* Python
* AWS Lambda
* Boto3

### Frontend

* React
* TypeScript
* Material UI
* Recharts
* Axios

### Infrastructure

* Terraform

---

## Repository Structure

backend/

├── api/

├── scanners/

├── services/

├── models/

├── lambda_handler.py

frontend/

└── dashboard/

terraform/

├── modules/

└── environments/

docs/

README.md

---

## Deployment

### Terraform

```bash
cd terraform/environments/dev

terraform init

terraform plan

terraform apply
```

### Frontend

```bash
cd frontend/dashboard

npm install

npm run build
```

Upload build files:

```bash
aws s3 sync dist s3://YOUR_BUCKET_NAME --delete
```

---

## Destroy Infrastructure

```bash
cd terraform/environments/dev

terraform destroy
```

---

## Screenshots

Add the following screenshots:

* Dashboard Overview
* Active Findings
* Historical Findings
* Trend Analytics
* Security Score
* Resource Distribution

Store screenshots inside:

docs/screenshots/

---

## Future Enhancements

* GuardDuty Integration
* CloudTrail Monitoring
* AWS Config Integration
* Multi-Account Monitoring
* CloudFront Distribution
* CSV Report Export
* Remediation Recommendations

---

## Author

Mohamed Wasim Abdul

AWS Cloud Security Monitoring Platform

Built using AWS Serverless Architecture, Terraform, React, and Python.
