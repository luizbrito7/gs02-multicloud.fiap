# Lambda

- Uma Lambda só (Node.js 24, `.zip`) para todas as rotas. Handler: `src/index.handler`.
- `event`: requisição montada pelo API Gateway (método, path, claims do JWT, body).
- `context`: dados da execução (`awsRequestId`, tempo restante), usados só no logger.
- O handler monta a chave `MÉTODO /path` a partir do `event` e chama o controller em `routes.js`.
- Role com logs (`AWSLambdaBasicExecutionRole`) e acesso só à tabela e aos objetos do bucket.

Ref.: [Handler Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) · [Payload do HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html) · [Context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html)
