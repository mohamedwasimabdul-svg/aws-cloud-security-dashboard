module "dynamodb" {

  source = "../../modules/dynamodb"

  table_name = "${var.project_name}-${var.environment}-findings"
}

module "sns" {

  source = "../../modules/sns"

  topic_name = "${var.project_name}-${var.environment}-alerts"
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
}
