# Front

- SPA no bucket S3 privado, servida pelo CloudFront no domínio padrão `*.cloudfront.net` (HTTPS com certificado da AWS).
- OAC: o CloudFront assina os pedidos ao S3; a bucket policy libera `s3:GetObject` só para esta distribuição.
- Rotas da SPA: o `403` do S3 vira `index.html` com `200`.
- Cache gerenciado `CachingOptimized`; HTTP redireciona para HTTPS.
- Valores `VITE_*` entram no build (`.env.production`).

Ref.: [OAC](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html) · [Cache policies gerenciadas](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)
