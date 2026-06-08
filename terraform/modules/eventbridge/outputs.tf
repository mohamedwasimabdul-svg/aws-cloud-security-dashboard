output "eventbridge_rule_arn" {
  value = aws_cloudwatch_event_rule.security_scan_schedule.arn
}

output "eventbridge_rule_name" {
  value = aws_cloudwatch_event_rule.security_scan_schedule.name
}