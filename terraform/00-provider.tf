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

  # Origens do front liberadas no CORS (API Gateway e bucket do mural)
  origins = ["http://localhost:5173", "https://quiz.luizbrito6.com.br"]
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
