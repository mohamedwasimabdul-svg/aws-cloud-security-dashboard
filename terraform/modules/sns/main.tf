resource "aws_sns_topic" "security_alerts" {

  name = var.topic_name

  tags = {
    Service = "SecurityDashboard"
  }
}

resource "aws_sns_topic_subscription" "email" {

  topic_arn = aws_sns_topic.security_alerts.arn

  protocol = "email"

  endpoint = var.email_address
}