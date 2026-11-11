# CI/CD

- GitHub Actions: `cicd-front.yml` e `cicd-back.yml`, disparados por push na `main` na pasta de cada app, ou manualmente.
- Front: build, `aws s3 sync` para o bucket e invalidação do CloudFront.
- Back: zip do código com dependências e `aws lambda update-function-code`.
- Credenciais: access key nos secrets do repositório.
- Infra (Terraform) roda fora do pipeline.

Ref.: [Workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) · [Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
