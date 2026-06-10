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

output "eventbridge_rule_name" {
  value = module.eventbridge.eventbridge_rule_name
}

output "eventbridge_rule_arn" {
  value = module.eventbridge.eventbridge_rule_arn
}

output "lambda_name" {
  value = module.lambda.lambda_function_name
}

output "lambda_arn" {
  value = module.lambda.lambda_function_arn
}

output "api_lambda_name" {
  value = module.api_lambda.lambda_name
}

output "api_lambda_arn" {
  value = module.api_lambda.lambda_arn
}

output "api_url" {
  value = module.api_gateway.invoke_url
}