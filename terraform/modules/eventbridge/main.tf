resource "aws_cloudwatch_event_rule" "security_scan_schedule" {

  name                = var.rule_name
  description         = "Triggers security scanner periodically"
  schedule_expression = var.schedule_expression
}