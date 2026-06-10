resource "aws_cloudwatch_log_group" "api_logs" {

  name = "/aws/lambda/${var.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "api" {

  depends_on = [
    aws_cloudwatch_log_group.api_logs
  ]

  function_name = var.function_name

  role = var.role_arn

  runtime = "python3.13"

  handler = "app.handler"

  filename = var.lambda_zip_path

  source_code_hash = filebase64sha256(var.lambda_zip_path)

  timeout = 30

  memory_size = 256

  environment {
    variables = {
      FINDINGS_TABLE = var.findings_table_name
    }
  }
}