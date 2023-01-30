import type { AWS } from '@serverless/typescript'

import hello from '@functions/hello'

const serverlessConfiguration: AWS = {
  service: 'lambda-typescript-test',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-api-gateway-throttling',
    'serverless-s3-sync'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
    }
  },
  functions: {
    hello
  },
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
    },
    s3Sync: {
      buckets: {
        bucketName: "sls-ts-test",
        localDir: "static"
      }
    }
  },
  /*
  resources: {
    Resources: {
      StaticSiteS3Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          bucketName: "sls-ts-test",
          AccessControl: "PublicRead",
          WebsiteConfiguration: {
            IndexDocument: "index.html"
          }
        }
      }
    }
  }
  */
}

module.exports = serverlessConfiguration
