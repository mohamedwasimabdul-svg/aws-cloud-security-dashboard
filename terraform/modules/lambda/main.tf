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

  environment {
    variables = {
      FINDINGS_TABLE = var.findings_table_name
    }
  }
}

resource "aws_lambda_permission" "allow_eventbridge" {

  statement_id = "AllowExecutionFromEventBridge"

  action = "lambda:InvokeFunction"

  function_name = aws_lambda_function.scanner.function_name

  principal = "events.amazonaws.com"

  source_arn = var.eventbridge_rule_arn
}

resource "aws_cloudwatch_event_target" "scanner_target" {

  rule = var.eventbridge_rule_name

  arn = aws_lambda_function.scanner.arn
}