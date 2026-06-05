module "dynamodb" {

  source = "../../modules/dynamodb"

  table_name = "${var.project_name}-${var.environment}-findings"
}

module "sns" {

  source = "../../modules/sns"

  topic_name = "${var.project_name}-${var.environment}-alerts"
}