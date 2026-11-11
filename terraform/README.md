<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
| ---- | ------- |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 6.72 |

## Providers

| Name | Version |
| ---- | ------- |
| <a name="provider_archive"></a> [archive](#provider\_archive) | 2.8.1 |
| <a name="provider_aws"></a> [aws](#provider\_aws) | 6.72.0 |

## Modules

No modules.

## Resources

| Name | Type |
| ---- | ---- |
| [aws_apigatewayv2_api.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_api) | resource |
| [aws_apigatewayv2_authorizer.cognito](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_authorizer) | resource |
| [aws_apigatewayv2_integration.lambda](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_integration) | resource |
| [aws_apigatewayv2_route.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_route) | resource |
| [aws_apigatewayv2_stage.default](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_stage) | resource |
| [aws_cognito_user_pool.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool) | resource |
| [aws_cognito_user_pool_client.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_pool_client) | resource |
| [aws_dynamodb_table.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table) | resource |
| [aws_iam_role.lambda](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy.data](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy) | resource |
| [aws_iam_role_policy_attachment.logs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_lambda_function.this](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) | resource |
| [aws_lambda_permission.apigateway](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission) | resource |
| [aws_s3_bucket.wall](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket) | resource |
| [aws_s3_bucket_cors_configuration.wall](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_cors_configuration) | resource |
| [archive_file.lambda](https://registry.terraform.io/providers/hashicorp/archive/latest/docs/data-sources/file) | data source |

## Inputs

No inputs.

## Outputs

| Name | Description |
| ---- | ----------- |
| <a name="output_api_url"></a> [api\_url](#output\_api\_url) | URL da API (VITE\_API\_URL no frontend) |
| <a name="output_dynamodb_table_name"></a> [dynamodb\_table\_name](#output\_dynamodb\_table\_name) | Nome da tabela (TABLE\_NAME na Lambda) |
| <a name="output_user_pool_client_id"></a> [user\_pool\_client\_id](#output\_user\_pool\_client\_id) | ID do app client (VITE\_USER\_POOL\_CLIENT\_ID no frontend) |
| <a name="output_user_pool_id"></a> [user\_pool\_id](#output\_user\_pool\_id) | ID do user pool (VITE\_USER\_POOL\_ID no frontend) |
| <a name="output_wall_bucket_name"></a> [wall\_bucket\_name](#output\_wall\_bucket\_name) | Nome do bucket do mural (BUCKET\_NAME na Lambda) |
<!-- END_TF_DOCS -->