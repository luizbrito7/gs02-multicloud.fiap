# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool
resource "aws_cognito_user_pool" "this" {
  name                     = "cognito-${local.project}-${local.env}"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client
resource "aws_cognito_user_pool_client" "this" {
  name                          = "client-${local.project}-${local.env}"
  user_pool_id                  = aws_cognito_user_pool.this.id
  prevent_user_existence_errors = "ENABLED"
}

# [DOC] - https://developer.hashicorp.com/terraform/language/values/outputs
output "user_pool_id" {
  description = "ID do user pool (VITE_USER_POOL_ID no frontend)"
  value       = aws_cognito_user_pool.this.id
}

output "user_pool_client_id" {
  description = "ID do app client (VITE_USER_POOL_CLIENT_ID no frontend)"
  value       = aws_cognito_user_pool_client.this.id
}
