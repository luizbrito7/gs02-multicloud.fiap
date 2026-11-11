terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.72"
    }
  }
}

locals {
  project = "quiz"
  env     = "lab"
  region  = "us-east-1"

  origins = ["http://localhost:5173", "https://${aws_cloudfront_distribution.this.domain_name}"]
}

provider "aws" {
  region  = local.region
  profile = "delta"

  # [DOC] - https://registry.terraform.io/providers/hashicorp/aws/latest/docs#default_tags-configuration-block
  default_tags {
    tags = {
      Environment = local.env
      Managed_by  = "Terraform"
      Project     = local.project
    }
  }
}
