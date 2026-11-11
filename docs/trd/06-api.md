# API Gateway

- HTTP API com stage `lab`; a URL vira o `VITE_API_URL` do front.
- JWT authorizer do Cognito em todas as rotas: token inválido ou ausente recebe `401` antes da Lambda.
- Uma integração `AWS_PROXY` (payload 2.0) para a Lambda única; as rotas espelham o `routes.js`.
- CORS liberado só para as origens do front (`local.origins`), métodos `GET` e `POST`.
- `aws_lambda_permission` deixa só esta API invocar a Lambda.

Ref.: [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html) · [JWT authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html) · [CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html)
