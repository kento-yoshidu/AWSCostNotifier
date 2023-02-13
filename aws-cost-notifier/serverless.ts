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
    hello: {
      handler: 'first.hello',
      /*
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
      */
    }
  }
}

module.exports = serverlessConfiguration
