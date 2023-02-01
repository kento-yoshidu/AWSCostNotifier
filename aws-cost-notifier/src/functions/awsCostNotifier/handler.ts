// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

// import schema from './schema';

import { IncomingWebhook } from '@slack/webhook'

// const awsCostNotifier: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
const awsCostNotifier = async () => {
  const slackWebHookUrl = process.env.SLACK_WEBHOOK_URL
  const slackWebHook = new IncomingWebhook(slackWebHookUrl)
  await slackWebHook.send("Hello Slack WebHook")
};

export const main = middyfy(awsCostNotifier);
