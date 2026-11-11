# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket
resource "aws_s3_bucket" "wall" {
  bucket = "wall-${local.project}-${local.env}"
}

# [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_cors_configuration
resource "aws_s3_bucket_cors_configuration" "wall" {
  bucket = aws_s3_bucket.wall.id

  cors_rule {
    allowed_methods = ["PUT"]
    allowed_origins = ["http://localhost:5173"]
    allowed_headers = ["Content-Type"]
  }
}

output "wall_bucket_name" {
  description = "Nome do bucket do mural (BUCKET_NAME na Lambda)"
  value       = aws_s3_bucket.wall.bucket
}
