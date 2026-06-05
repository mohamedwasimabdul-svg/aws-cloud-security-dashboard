module "dynamodb" {

  source = "../../modules/dynamodb"

  table_name = "${var.project_name}-${var.environment}-findings"
}