import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const awsCostNotifier: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse({
    message: `Hello , welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(awsCostNotifier);
