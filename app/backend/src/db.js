import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

const db = DynamoDBDocumentClient.from(new DynamoDBClient())
const TableName = process.env.TABLE_NAME

export async function getEntry(quizId, userId) {
  const { Item } = await db.send(new GetCommand({ TableName, Key: { quizId, userId } }))
  return Item
}

export async function listEntries(quizId) {
  const command = quizId
    ? new QueryCommand({ TableName, KeyConditionExpression: 'quizId = :quizId', ExpressionAttributeValues: { ':quizId': quizId } })
    : new ScanCommand({ TableName })
  const { Items } = await db.send(command)
  return Items
}

export function saveScore(quizId, user, score) {
  return db.send(new UpdateCommand({
    TableName,
    Key: { quizId, userId: user.sub },
    UpdateExpression: 'SET score = :score, #name = :name',
    ConditionExpression: 'attribute_not_exists(score)',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':score': score, ':name': user.name },
  }))
}

export function savePhoto(quizId, user, photo) {
  return db.send(new UpdateCommand({
    TableName,
    Key: { quizId, userId: user.sub },
    UpdateExpression: 'SET photo = :photo, #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':photo': photo, ':name': user.name },
  }))
}
