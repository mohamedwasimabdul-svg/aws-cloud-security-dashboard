resource "aws_dynamodb_table" "security_findings" {

  name         = var.table_name
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "finding_id"

  attribute {
    name = "finding_id"
    type = "S"
  }

  attribute {
    name = "severity"
    type = "S"
  }

  global_secondary_index {

    name            = "SeverityIndex"
    hash_key        = "severity"
    projection_type = "ALL"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  tags = {
    Service = "SecurityDashboard"
  }
}