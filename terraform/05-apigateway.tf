# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_api
resource "aws_apigatewayv2_api" "this" {
  name          = "api-${local.project}-${local.env}"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = local.origins
    allow_methods = ["GET", "POST"]
    allow_headers = ["authorization", "content-type"]
  }
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_authorizer
resource "aws_apigatewayv2_authorizer" "cognito" {
  name             = "cognito"
  api_id           = aws_apigatewayv2_api.this.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]

  jwt_configuration {
    issuer   = "https://${aws_cognito_user_pool.this.endpoint}"
    audience = [aws_cognito_user_pool_client.this.id]
  }
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_integration
resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.this.invoke_arn
  payload_format_version = "2.0"
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_route
resource "aws_apigatewayv2_route" "this" {
  for_each = toset([
    "GET /quizzes",
    "GET /quizzes/{id}",
    "POST /quizzes/{id}/answers",
    "GET /quizzes/{id}/wall",
    "POST /quizzes/{id}/photo",
    "GET /ranking",
  ])

  api_id             = aws_apigatewayv2_api.this.id
  route_key          = each.value
  target             = "integrations/${aws_apigatewayv2_integration.lambda.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = local.env
  auto_deploy = true
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission
resource "aws_lambda_permission" "apigateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.this.execution_arn}/*/*"
}

output "api_url" {
  description = "URL da API (VITE_API_URL no frontend)"
  value       = aws_apigatewayv2_stage.default.invoke_url
}
