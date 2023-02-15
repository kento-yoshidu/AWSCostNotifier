import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'ts-aws-cost-notifier',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: "ap-northeast-1"
  },
  plugins: ["serverless-webpack"],
  functions: {
    costNotifier: {
      handler: "src/costNotifier.handler",
      events: [
        {
          schedule: {
            rate: ["cron(0 0 * * ? *)"]
          }
        }
      ],
      environment: {
        SLACK_WEBHOOK_URL: "${ssm:cost_notifier_url_ts}"
      }
    }
  }
}

module.exports = serverlessConfiguration
