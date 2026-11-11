# Spec do diagrama animado (skill architecture-diagrams). Mesmo layout de docs/architecture.drawio.
# Render: ~/.claude/skills/architecture-diagrams/.venv/bin/python ~/.claude/skills/architecture-diagrams/scripts/diagram.py docs/arch.py docs/arch.gif
O = 70  # espaço do título

W, H = 980, 1420
TITLE = 'Quiz Guilda DevOps · arquitetura AWS'
SUBTITLE = 'front-end-layer · back-end-layer · data-layer'

LAYER = dict(fill='#F8F9FA', stroke='#EAEDED', text='#879196')

GROUPS = [
    dict(style='aws', x=15, y=140 + O, w=950, h=1185, label='AWS Cloud'),
    dict(style='plain', x=55, y=185 + O, w=870, h=1100, label='us-east-1',
         colors=dict(stroke='#00A4A6', text='#147EBA', icon='Region')),
    dict(style='soft', x=100, y=250 + O, w=780, h=260, label='front-end-layer', colors=LAYER),
    dict(style='plain', x=140, y=300 + O, w=400, h=170, label='aplicação web', label_right=True,
         colors=dict(fill='#F8F9FA', stroke='#D5DBDB', text='#879196')),
    dict(style='soft', x=100, y=600 + O, w=780, h=370, label='back-end-layer', colors=LAYER),
    dict(style='soft', x=100, y=1070 + O, w=780, h=170, label='data-layer', colors=LAYER),
]

NODES = [
    dict(icon='Users', x=240, y=40 + O, label=['Guilda DevOps']),
    dict(icon='AmazonCloudFront', x=240, y=370 + O, label=['CloudFront']),
    dict(icon='AmazonSimpleStorageService', x=440, y=370 + O, label=['S3 · site']),
    dict(icon='AmazonCognito', x=780, y=370 + O, label=['Cognito']),
    dict(icon='AmazonAPIGateway', x=490, y=680 + O, label=['API Gateway']),
    dict(icon='AWSLambda', x=490, y=890 + O, label=['Lambda']),
    dict(icon='AmazonSimpleStorageService', x=290, y=1155 + O, label=['S3 · mural']),
    dict(icon='AmazonDynamoDB', x=690, y=1155 + O, label=['DynamoDB']),
]

EDGES = [
    dict(points=[(240, 108 + O), (240, 338 + O)], label='HTTPS', label_at=(240, 162 + O)),
    dict(points=[(272, 370 + O), (408, 370 + O)], label='OAC', label_at=(340, 370 + O)),
    dict(points=[(540, 370 + O), (748, 370 + O)], label='autenticação', label_at=(660, 370 + O)),
    dict(points=[(340, 470 + O), (340, 680 + O), (458, 680 + O)], label='HTTPS + JWT', label_at=(340, 555 + O)),
    dict(points=[(780, 438 + O), (780, 680 + O), (522, 680 + O)], label='valida JWT', label_at=(780, 555 + O)),
    dict(points=[(490, 748 + O), (490, 858 + O)], label='invoca', label_at=(490, 795 + O)),
    dict(points=[(490, 958 + O), (490, 1020 + O), (290, 1020 + O), (290, 1123 + O)], label='assina URL', label_at=(380, 1020 + O)),
    dict(points=[(490, 1020 + O), (690, 1020 + O), (690, 1123 + O)], label='lê / grava', label_at=(600, 1020 + O)),
]
