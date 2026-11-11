# Spec do diagrama animado (skill architecture-diagrams), layers em colunas. Mesmos recursos de docs/architecture.drawio.
# Render: ~/.claude/skills/architecture-diagrams/.venv/bin/python ~/.claude/skills/architecture-diagrams/scripts/diagram.py docs/arch.py docs/architecture.gif
O = -100  # sobe tudo: sem título

W, H = 1560, 660

LAYER = dict(fill='#F8F9FA', stroke='#EAEDED', text='#879196')

GROUPS = [
    dict(style='aws', x=170, y=140 + O, w=1360, h=590, label='AWS Cloud'),
    dict(style='plain', x=210, y=185 + O, w=1280, h=505, label='us-east-1',
         colors=dict(stroke='#00A4A6', text='#147EBA', icon='Region')),
    dict(style='soft', x=250, y=245 + O, w=410, h=405, label='front-end-layer', colors=LAYER),
    dict(style='plain', x=280, y=280 + O, w=350, h=150, label='aplicação web', label_right=True,
         colors=dict(fill='#F8F9FA', stroke='#D5DBDB', text='#879196')),
    dict(style='soft', x=760, y=245 + O, w=340, h=405, label='back-end-layer', colors=LAYER),
    dict(style='soft', x=1180, y=245 + O, w=270, h=405, label='data-layer', colors=LAYER),
]

NODES = [
    dict(icon='Users', x=60, y=360 + O, label=['Guilda DevOps']),
    dict(icon='AmazonCloudFront', x=360, y=360 + O, label=['CloudFront']),
    dict(icon='AmazonSimpleStorageService', x=550, y=360 + O, label=['S3 · site']),
    dict(icon='AmazonCognito', x=455, y=570 + O, label=['Cognito']),
    dict(icon='AmazonAPIGateway', x=840, y=360 + O, label=['API Gateway']),
    dict(icon='AWSLambda', x=1020, y=360 + O, label=['Lambda']),
    dict(icon='AmazonSimpleStorageService', x=1340, y=360 + O, label=['S3 · mural']),
    dict(icon='AmazonDynamoDB', x=1340, y=570 + O, label=['DynamoDB']),
]

EDGES = [
    dict(points=[(92, 360 + O), (328, 360 + O)], label='HTTPS', label_at=(130, 360 + O)),
    dict(points=[(392, 360 + O), (518, 360 + O)], label='OAC', label_at=(455, 360 + O)),
    dict(points=[(455, 430 + O), (455, 538 + O)], label='autenticação', label_at=(455, 484 + O)),
    dict(points=[(630, 360 + O), (808, 360 + O)], label='HTTPS + JWT', label_at=(710, 360 + O)),
    dict(points=[(487, 570 + O), (840, 570 + O), (840, 414 + O)], label='valida JWT', label_at=(710, 570 + O)),
    dict(points=[(872, 360 + O), (988, 360 + O)], label='invoca', label_at=(930, 360 + O)),
    dict(points=[(1052, 360 + O), (1308, 360 + O)], label='assina URL', label_at=(1228, 360 + O)),
    dict(points=[(1140, 360 + O), (1140, 570 + O), (1308, 570 + O)], label='lê / grava', label_at=(1140, 470 + O)),
]
