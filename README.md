# AWS Cloud Security Dashboard

A serverless cloud security monitoring platform built on AWS that automatically scans cloud resources, stores security findings, generates alerts, calculates compliance scores, and visualizes security posture through a modern web dashboard.

---

## Features

### Security Monitoring

* IAM Security Checks
* S3 Security Checks
* Automated Daily Scans
* Active Finding Deduplication
* Historical Finding Tracking

### Compliance

* Security Compliance Scoring
* Severity-Based Risk Assessment

### Alerting

* SNS Email Notifications
* Critical Finding Alerts

### Dashboard

* Security Score Gauge
* Severity Distribution
* Findings by Resource Type
* Findings Explorer
* Search and Filtering
* Historical Findings Metrics

---

## Architecture

React Dashboard
→ Amazon S3

Amazon API Gateway
→ API Lambda
→ DynamoDB

Amazon EventBridge
→ Scanner Lambda
→ DynamoDB
→ SNS

---

## AWS Services Used

* AWS Lambda
* Amazon DynamoDB
* Amazon SNS
* Amazon EventBridge
* Amazon API Gateway
* Amazon S3
* AWS IAM

---

## Infrastructure as Code

All infrastructure is provisioned using Terraform.

Modules include:

* IAM
* Lambda
* DynamoDB
* EventBridge
* SNS
* API Gateway
* Frontend Hosting

---

## API Endpoints

### Summary

GET /summary

Returns:

* Security score
* Severity counts
* Active findings count

### Findings

GET /findings

Returns active findings only.

### History

GET /history

Returns complete historical findings.

---

## Dashboard Features

### Security Metrics

* Critical Findings
* High Findings
* Medium Findings
* Low Findings
* Active Findings
* Historical Findings

### Visualizations

* Severity Distribution Chart
* Findings by Resource Type
* Security Score Gauge

---

## Deployment

Frontend:

* React
* Vite
* Amazon S3 Website Hosting

Backend:

* AWS Lambda
* API Gateway
* DynamoDB

Infrastructure:

* Terraform

---

## Future Roadmap

* Security Group Scanner
* Trend Analytics
* CSV Export
* CloudFront Distribution
* Multi-Account Monitoring

---

## Author

Mohamed Wasim Abdul

Cloud Security & AWS Engineering Project
