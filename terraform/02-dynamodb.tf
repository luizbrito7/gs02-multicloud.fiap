# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "this" {
  name         = "dynamodb-${local.project}-${local.env}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "quizId"
  range_key    = "userId"

  attribute {
    name = "quizId"
    type = "S"
  }

  attribute {
    name = "userId"
    type = "S"
  }

}

output "dynamodb_table_name" {
  description = "Nome da tabela (TABLE_NAME na Lambda)"
  value       = aws_dynamodb_table.this.name
}
