output "dynamodb_table_name" {
  value = module.dynamodb.table_name
}

output "dynamodb_table_arn" {
  value = module.dynamodb.table_arn
}

output "sns_topic_name" {
  value = module.sns.topic_name
}

output "sns_topic_arn" {
  value = module.sns.topic_arn
}

output "scanner_role_arn" {
  value = module.iam.role_arn
}