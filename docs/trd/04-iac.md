# IaC

- Terraform numa pasta só (`terraform/`), um arquivo por serviço (`NN-servico.tf`), sem módulos.
- Nomes na AWS: `<recurso>-<projeto>-<env>`, ex.: `dynamodb-quiz-lab`, `wall-quiz-lab`.
- Tags padrão pelo `default_tags` do provider.

Ref.: [Local values](https://developer.hashicorp.com/terraform/language/values/locals) · [default_tags](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#default_tags-configuration-block)
