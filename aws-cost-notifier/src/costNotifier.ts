import { IncomingWebhook} from "@slack/webhook"

export const handler = async (event, context) => {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const slackWebhook = new IncomingWebhook(slackWebhookUrl)

  await slackWebhook.send("Hello Slack Webhook")

  return {
    url: slackWebhookUrl
  }
}

