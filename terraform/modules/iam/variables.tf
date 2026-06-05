variable "role_name" {
  description = "IAM Role Name"
  type        = string
}

variable "dynamodb_table_arn" {
  description = "DynamoDB Table ARN"
  type        = string
}

variable "sns_topic_arn" {
  description = "SNS Topic ARN"
  type        = string
}