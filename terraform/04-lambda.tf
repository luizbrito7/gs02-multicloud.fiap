# [DOC] - https://registry.terraform.io/providers/hashicorp/archive/latest/docs/data-sources/file
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../app/backend"
  output_path = "${path.module}/lambda.zip"
  excludes    = ["src/dev.js", ".env.dev", "docker-compose.yml", "README.md"]
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role
resource "aws_iam_role" "lambda" {
  name = "lambda-${local.project}-${local.env}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# [DOC] - https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSLambdaBasicExecutionRole.html
resource "aws_iam_role_policy_attachment" "logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy
resource "aws_iam_role_policy" "data" {
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:UpdateItem"
        ]
        Effect   = "Allow"
        Resource = aws_dynamodb_table.this.arn
      },

      {
        Action = [
          "s3:PutObject",
          "s3:GetObject"
        ]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.wall.arn}/*"
      }
    ]
  })
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "this" {
  function_name    = "lambda-${local.project}-${local.env}"
  role             = aws_iam_role.lambda.arn
  runtime          = "nodejs24.x"
  handler          = "src/index.handler"
  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      TABLE_NAME  = aws_dynamodb_table.this.name
      BUCKET_NAME = aws_s3_bucket.wall.bucket
    }
  }
}

# [DOC] - https://developer.hashicorp.com/terraform/language/import
import {
  to = aws_cloudwatch_log_group.lambda
  id = "/aws/lambda/lambda-${local.project}-${local.env}"
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group
resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${aws_lambda_function.this.function_name}"
  retention_in_days = 7
}
