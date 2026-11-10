# Autenticação

Login por e-mail e senha, com telas próprias no React e usuários no Cognito.

## Peças

- **Cognito user pool**: guarda os usuários.
- **App client público** (sem secret), com os fluxos `ALLOW_USER_SRP_AUTH` e `ALLOW_REFRESH_TOKEN_AUTH`. App que roda no navegador não guarda segredo [1].
- **Lib `aws-amplify`** no React: faz os cálculos do SRP e guarda os tokens. O SDK de baixo nível não calcula o SRP [2].
- **JWT authorizer** no API Gateway: valida o token antes de chamar a Lambda [3].

## Cadastro

1. A tela chama `signUp`. O e-mail e a senha vão para o Cognito na chamada `SignUp`, protegidos pelo HTTPS [4].
2. O Cognito envia um código por e-mail. A tela chama `confirmSignUp` com o código.

## Login (SRP)

A senha não é enviada no login. O navegador prova que conhece a senha [2]:

1. No cadastro, o servidor guarda um `salt` e um **verificador**, calculado a partir de `hash(salt + senha)` por uma função de mão única [5].
2. No login, navegador e Cognito trocam valores públicos (`A`, `B` e o `salt`).
3. Cada lado calcula uma chave: o navegador usa a senha digitada; o Cognito usa o verificador.
4. As chaves só são iguais se a senha estiver correta. O navegador envia a prova, o Cognito confere e devolve os tokens ID, access e refresh [6].

## Chamada à API

1. O front envia o token no header `Authorization`.
2. O JWT authorizer valida o token. Token ausente ou inválido recebe `401` e a Lambda nem é chamada [3].
3. A Lambda lê o usuário (`sub`, `name`) das claims do token.
4. Quando o token expira, a renovação usa o refresh token, sem pedir a senha de novo [6].

## Referências

1. [Authorization models: client-side authentication](https://docs.aws.amazon.com/cognito/latest/developerguide/authentication-flows-public-server-side.html)
2. [Authentication flows: SRP](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow-methods.html)
3. [HTTP API JWT authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html)
4. [SignUp API](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html)
5. [SRP design, Stanford](http://srp.stanford.edu/design.html)
6. [Authentication with user pools](https://docs.aws.amazon.com/cognito/latest/developerguide/authentication.html)
