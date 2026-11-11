# Roteiro do vídeo (~10 min)

Em cada layer: desenho → Terraform → console AWS.

1. **Abertura (0:00):** o que é o QuizOps e o que vou mostrar.
2. **Demo (0:30):** criar conta → quiz → foto no mural → ranking.
3. **Visão geral (2:00):** três layers, um `.tf` por serviço.
4. **Front (2:30):** CloudFront + S3 privado (OAC) + Cognito. Mostrar o usuário da demo no Cognito.
5. **Back (4:30):** API Gateway com JWT → Lambda única. Mostrar os logs da demo.
6. **Dados (6:30):** DynamoDB (resposta da demo) + S3 do mural (foto da demo).
7. **CI/CD (8:00):** push na main → pipeline do front e do back. Mostrar uma execução verde.
8. **Reproduzir (9:00):** passo a passo no repositório.
9. **Encerramento (9:30):** serverless, tudo em código, reproduzível. Obrigado.

## Antes de gravar

- Abas: app, draw.io, VS Code em `terraform/`, console em `us-east-1`, GitHub Actions.
- E-mail de teste e uma imagem para o mural.
- Subir no YouTube como privado e compartilhar com profeduardo.popovici@fiap.com.br.
