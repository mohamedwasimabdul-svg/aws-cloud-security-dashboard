resource "aws_iam_role" "scanner_role" {

  name = var.role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "lambda.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "scanner_policy" {

  name = "${var.role_name}-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [

      {
        Effect = "Allow"

        Action = [
          "iam:ListUsers",
          "iam:ListAccessKeys",
          "iam:GetAccessKeyLastUsed",
          "iam:GetLoginProfile",
          "iam:ListAttachedUserPolicies",
          "iam:GetUser"
        ]

        Resource = "*"
      },

      {
        Effect = "Allow"

        Action = [
          "ec2:DescribeInstances",
          "ec2:DescribeSecurityGroups"
        ]

        Resource = "*"
      },

      {
        Effect = "Allow"

        Action = [
          "s3:ListAllMyBuckets",
          "s3:GetBucketEncryption",
          "s3:GetBucketVersioning",
          "s3:GetBucketPolicyStatus",
          "s3:GetPublicAccessBlock
        ]

        Resource = "*"
      },

      {
        Effect = "Allow"

        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan"
        ]

        Resource = var.dynamodb_table_arn
      },

      {
        Effect = "Allow"

        Action = [
          "sns:Publish"
        ]

        Resource = var.sns_topic_arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "scanner_attachment" {

  role       = aws_iam_role.scanner_role.name
  policy_arn = aws_iam_policy.scanner_policy.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {

  role = aws_iam_role.scanner_role.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}