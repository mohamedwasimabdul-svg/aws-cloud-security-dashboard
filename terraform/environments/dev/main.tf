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

