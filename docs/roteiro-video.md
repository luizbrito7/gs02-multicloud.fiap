# Roteiro do vídeo: QuizOps

Duração alvo: 10 minutos. Cada layer segue o mesmo ciclo: **desenho → Terraform → recurso na AWS**.

Abas abertas antes de gravar: app no ar, `docs/architecture.drawio` no draw.io, VS Code em `terraform/`, console da AWS em `us-east-1`, GitHub.

## 1. Abertura (0:00–0:30)

**Tela:** capa do deck.

**Fala:** "Este é o QuizOps, um quiz serverless na AWS, entrega da Global Solution de Multicloud da FIAP. Vou mostrar o app funcionando e depois cada layer da arquitetura: o desenho, o Terraform e o recurso criado na AWS."

## 2. Demo rápida (0:30–2:00)

**Tela:** `front_url` do CloudFront.

1. Criar conta e confirmar o código do e-mail.
2. Responder o quiz.
3. Enviar uma foto no mural.
4. Abrir o ranking.

## 3. Visão geral (2:00–2:30)

**Desenho:** página *Visão geral*.

**Fala:** "A arquitetura tem três layers: front-end, back-end e dados. O Terraform tem um arquivo por serviço, e vou passar por cada layer."

## 4. front-end-layer (2:30–4:30)

**Desenho:** página *front-end-layer*. "O usuário acessa o CloudFront, que serve o React de um bucket privado; o login é no Cognito."

| Terraform | Mostrar no código | Console AWS |
|---|---|---|
| `06-s3-front.tf` | bucket `front-quiz-lab` e a bucket policy que só libera o CloudFront | S3 → `front-quiz-lab` → Permissions → Bucket policy |
| `07-cloudfront.tf` | OAC, `CachingOptimized`, erro 403 → `index.html` | CloudFront → distribuição → Origins (OAC) e Error pages |
| `01-cognito.tf` | user pool e app client sem secret | Cognito → `cognito-quiz-lab` → Users (o usuário criado na demo) |

## 5. back-end-layer (4:30–6:30)

**Desenho:** página *back-end-layer*. "O front chama o API Gateway com o JWT; o authorizer valida e invoca uma Lambda só para todas as rotas."

| Terraform | Mostrar no código | Console AWS |
|---|---|---|
| `05-apigateway.tf` | authorizer JWT, rotas com `for_each`, stage `lab` | API Gateway → `api-quiz-lab` → Routes e Authorization |
| `04-lambda.tf` | `archive_file`, role com acesso só à tabela e ao bucket, variáveis `TABLE_NAME` e `BUCKET_NAME` | Lambda → `lambda-quiz-lab` → Configuration → Environment variables; Monitor → logs da demo no CloudWatch |

## 6. data-layer (6:30–8:00)

**Desenho:** página *data-layer*. "A Lambda grava as respostas no DynamoDB e assina URLs para o navegador enviar a foto direto ao S3."

| Terraform | Mostrar no código | Console AWS |
|---|---|---|
| `02-dynamodb.tf` | chave `quizId` + `userId`, on-demand | DynamoDB → `dynamodb-quiz-lab` → Explore items (a resposta da demo) |
| `03-s3-wall.tf` | bucket privado e CORS só com `PUT` | S3 → `wall-quiz-lab` → a foto da demo em `quizId/userId` |

## 7. CI/CD (8:00–9:00)

**Tela:** `.github/workflows/` e a aba Actions com uma execução verde.

**Fala:** "Cada push na main roda o pipeline da pasta alterada. O front faz build, sync no S3 e invalida o CloudFront; o back gera o zip e atualiza a Lambda. A infra fica com o Terraform."

## 8. Como reproduzir (9:00–9:30)

**Tela:** `docs/passo-a-passo.md` no GitHub.

**Fala:** "O passo a passo no repositório mostra como subir tudo em outra conta AWS com poucos comandos."

## 9. Encerramento (9:30–10:00)

**Tela:** slide Obrigado.

**Fala:** "Uma aplicação serverless completa, com autenticação, upload de arquivos e deploy automático, toda em código e reproduzível. Obrigado."

## Checklist antes de gravar

- Conta de teste nova (e-mail que recebe o código) e uma imagem pronta para o mural.
- Pipeline com uma execução verde recente na aba Actions.
- Console da AWS na região `us-east-1`.
- Subir no YouTube como **privado** e compartilhar com profeduardo.popovici@fiap.com.br (vídeo privado só abre para quem foi convidado); colocar o link nas referências do artigo.
