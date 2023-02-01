// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'awsCostNotifier',
        /*
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        */
      },
      schedule: {
        rate: "cron(0 0 * * ? *)"
      }
    },
  ],
  environment: {
    SLACK_WEBHOOK_URL: "${ssm:cost_notifier_url_ts}"
  },
};
