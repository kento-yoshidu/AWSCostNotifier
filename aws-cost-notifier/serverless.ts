import type { AWS } from '@serverless/typescript';

import awsCostNotifier from '@functions/awsCostNotifier';

const serverlessConfiguration: AWS = {
  service: 'aws-cost-notifier',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-api-gateway-throttling'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    }
  },
  functions: { awsCostNotifier },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10
    },
    apiGatewayThrottling: {
      maxRequestsPerSecond: 5,
      maxConcurrentRequests: 3
    }
  }
}

module.exports = serverlessConfiguration
