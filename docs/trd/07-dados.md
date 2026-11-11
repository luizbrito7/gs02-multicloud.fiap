# Dados

- Tabela DynamoDB on-demand, chave `quizId` (partition) + `userId` (sort): uma resposta por usuário por quiz.
- Item guarda `score`, `photo` (chave no S3) e `name` (e-mail do usuário).
- Resposta única: gravação condicional (`attribute_not_exists(score)`); segunda tentativa recebe `409`.
- Ranking de um quiz usa `Query` por `quizId`; o geral usa `Scan`.
- Quizzes ficam em JSON no repo (`app/backend/quizzes/`), não no banco.

Ref.: [Chave primária](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey) · [Condition expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html)
