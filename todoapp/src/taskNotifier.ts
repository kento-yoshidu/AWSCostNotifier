import { IncomingWebhook } from "@slack/webhook"

export const handler = async () => {

  const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL || "")

  await slackWebhook.send("Hello TodoApp")
}
