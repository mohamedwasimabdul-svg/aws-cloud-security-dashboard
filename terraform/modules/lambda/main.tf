resource "aws_cloudwatch_log_group" "scanner_logs" {

  name = "/aws/lambda/${var.function_name}"

  retention_in_days = 30
}

resource "aws_lambda_function" "scanner" {

  depends_on = [
    aws_cloudwatch_log_group.scanner_logs
  ]

  function_name = var.function_name

  role = var.role_arn

  runtime = "python3.13"

  handler = "lambda_handler.lambda_handler"

  filename = var.lambda_zip_path

  source_code_hash = filebase64sha256(var.lambda_zip_path)

  timeout = 30

  memory_size = 256
}