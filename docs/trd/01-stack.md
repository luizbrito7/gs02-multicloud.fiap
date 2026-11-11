# Stack de desenvolvimento

## Front

- JavaScript.
- React: biblioteca de UI, SPA.
- Vite: build que gera os arquivos estáticos.
- Tailwind: CSS.

## Back

- Node.js na Lambda (runtime `nodejs24.x`), mesma linguagem do front.
- Pacote `.zip`, sem container: o runtime é gerenciado pela AWS e a função não fica inativa por ociosidade.

## Banco de dados

- DynamoDB.
- Local: DynamoDB local via Docker Compose (imagem `amazon/dynamodb-local`, porta 8000).

## IaC

- Terraform: uma pasta, um arquivo por serviço, sem módulos.


