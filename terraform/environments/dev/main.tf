module "dynamodb" {

  source = "../../modules/dynamodb"

  table_name = "${var.project_name}-${var.environment}-findings"
}

module "sns" {

  source = "../../modules/sns"

  topic_name = "${var.project_name}-${var.environment}-alerts"

  email_address = "mohamedwasimabdul@gmail.com"
}

module "iam" {

  source = "../../modules/iam"

  role_name = "${var.project_name}-${var.environment}-scanner-role"

  dynamodb_table_arn = module.dynamodb.table_arn

  sns_topic_arn = module.sns.topic_arn
}

module "eventbridge" {

  source = "../../modules/eventbridge"

  rule_name = "${var.project_name}-${var.environment}-daily-security-scan"

  schedule_expression = "rate(1 day)"
}

module "lambda" {

  source = "../../modules/lambda"

  function_name = "${var.project_name}-${var.environment}-scanner"

  role_arn = module.iam.role_arn

  lambda_zip_path = "../../../backend/lambda.zip"

  eventbridge_rule_arn = module.eventbridge.eventbridge_rule_arn

  eventbridge_rule_name = module.eventbridge.eventbridge_rule_name

  findings_table_name = module.dynamodb.table_name

  sns_topic_arn = module.sns.topic_arn
}

module "api_lambda" {

  source = "../../modules/api_lambda"

  function_name = "${var.project_name}-${var.environment}-api"

  role_arn = module.iam.role_arn

  lambda_zip_path = "../../../backend/api/api.zip"

  findings_table_name = module.dynamodb.table_name
}

module "api_gateway" {

  source = "../../modules/api_gateway"

  api_name = "${var.project_name}-${var.environment}-api"

  lambda_arn = module.api_lambda.lambda_arn

  lambda_name = module.api_lambda.lambda_name
}
