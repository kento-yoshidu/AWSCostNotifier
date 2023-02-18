import { DynamoDB } from "aws-sdk"
import crypt from "crypto"

export async function post(event, context) {
  const requestBody = JSON.parse(event.body)  

  const item = {
    id: { S: crypt.randomUUID() },
    title: { S: requestBody.title }
  }

  const dynamdb = new DynamoDB({
    region: "ap-northeast-1"
  })

  await dynamdb.putItem({
    TableName: "tasks",
    Item: item
  }).promise()

  return item
}
