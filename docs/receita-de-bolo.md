# Receita de bolo: QuizOps na AWS

Passo a passo para recriar a aplicação e a arquitetura do zero em outra conta AWS.

## Ingredientes

- Conta AWS com permissão de administrador
- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Terraform 1.5+](https://developer.hashicorp.com/terraform/install)
- [Node.js 24](https://nodejs.org/en/download)
- Git

## 1. Clonar o repositório

```bash
git clone https://github.com/luizbrito7/gs02-multicloud.fiap.git
cd gs02-multicloud.fiap
```

## 2. Configurar o profile da AWS

```bash
aws configure --profile meu-profile
aws sts get-caller-identity --profile meu-profile
```

O segundo comando deve mostrar o ID da sua conta. Ref.: [perfis do AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).

## 3. Ajustar o Terraform

Em `terraform/00-provider.tf`, troque o profile e o nome do projeto:

```hcl
locals {
  project = "quiz-rm12345"   # nome único: vira parte do nome dos buckets
  ...
}

provider "aws" {
  profile = "meu-profile"
  ...
}
```

Nome de bucket S3 é único no mundo inteiro, por isso o `project` precisa ser diferente do original. Ref.: [regras de nome de bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html).

## 4. Instalar as dependências do back-end

O Terraform empacota a pasta `app/backend` inteira no zip da Lambda, então as dependências precisam estar instaladas antes.

```bash
cd app/backend
npm ci --omit=dev
cd ../..
```

## 5. Criar a infraestrutura

```bash
cd terraform
terraform init
terraform plan -out tfplan
terraform apply tfplan
```

Leva alguns minutos (o CloudFront é o mais lento). No fim, o Terraform mostra os outputs: `api_url`, `user_pool_id`, `user_pool_client_id`, `front_bucket_name`, `front_url` e outros. Ref.: [terraform apply](https://developer.hashicorp.com/terraform/cli/commands/apply).

## 6. Apontar o front-end para a sua infraestrutura

Ainda dentro de `terraform/`, gere o `.env.production` do front com os outputs:

```bash
cat > ../app/frontend/.env.production <<EOF
VITE_API_URL=$(terraform output -raw api_url)
VITE_USER_POOL_ID=$(terraform output -raw user_pool_id)
VITE_USER_POOL_CLIENT_ID=$(terraform output -raw user_pool_client_id)
EOF
```

Ref.: [variáveis de ambiente no Vite](https://vite.dev/guide/env-and-mode).

## 7. Publicar o front-end

```bash
BUCKET=$(terraform output -raw front_bucket_name)
cd ../app/frontend
npm ci
npm run build
aws s3 sync dist s3://$BUCKET --delete --profile meu-profile
```

Ref.: [aws s3 sync](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html).

## 8. Testar

1. Abra a URL do output `front_url` (`https://xxxx.cloudfront.net`).
2. Crie uma conta e confirme com o código que chega no e-mail. Ref.: [cadastro no Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html).
3. Responda o quiz, envie uma foto no mural e confira o ranking.

## 9. Liberar um novo quiz (opcional)

Crie `app/backend/quizzes/02.json` no formato do `01.json` com `"released": true` e rode de novo `terraform apply` dentro de `terraform/`. O zip muda e a Lambda é atualizada.

## 10. Deploy automático com GitHub Actions (opcional)

Os workflows em `.github/workflows/` publicam o front e o back a cada push na `main`.

1. No fork, crie os secrets `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY`. Ref.: [secrets no GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).
2. Em `cicd-front.yml`, troque `front-quiz-lab` por `front-<seu project>-lab` (duas vezes).
3. Em `cicd-back.yml`, troque `lambda-quiz-lab` por `lambda-<seu project>-lab`.
4. Faça commit do `.env.production` gerado no passo 6.

Em deploys seguintes do front, o workflow invalida o cache do CloudFront. Ref.: [create-invalidation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/create-invalidation.html).

## 11. Destruir tudo

```bash
cd terraform
terraform destroy
```

Os buckets têm `force_destroy`, então são apagados mesmo com arquivos. Ref.: [terraform destroy](https://developer.hashicorp.com/terraform/cli/commands/destroy).
