<h1 align="center">Quiz Guilda DevOps</h1>

<p align="center"><img src="docs/architecture.gif" alt="Arquitetura AWS do Quiz Guilda DevOps: front-end-layer, back-end-layer e data-layer" /></p>

Quiz serverless na AWS para os encontros da guilda DevOps: cadastro e login, um quiz por encontro, mural de fotos e ranking. Global Solution de Cloud Computing da FIAP.

## Stack

- **Front:** React + Vite + Tailwind, servido pelo S3 com CloudFront.
- **Back:** Lambda Node.js atrás de um API Gateway HTTP com autorizador JWT do Cognito.
- **Dados:** DynamoDB para respostas e ranking, S3 para as fotos do mural. Os quizzes são JSON no repo.
- **IaC e CI/CD:** Terraform e GitHub Actions.

## Por onde começar

| Quero... | Vá para |
|---|---|
| Subir tudo na minha conta AWS | [Passo a passo](docs/passo-a-passo.md) ([PDF](docs/passo-a-passo.pdf)) |
| Entender o produto | [PRD](docs/prd.md) |
| Entender as decisões técnicas | [TRD](docs/trd/) |
| Rodar o front ou o back local | [app/frontend](app/frontend/README.md) · [app/backend](app/backend/README.md) |
| Ver a infraestrutura | [terraform/](terraform/) |
| Ler o artigo | [Artigo ABNT](docs/artigo/artigo.pdf) |
