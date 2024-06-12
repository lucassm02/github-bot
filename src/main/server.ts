import mongoose from 'mongoose';

import { logger } from '@/util';
import { MONGO, SERVER } from '@/util/constants';

import { application } from './application';

application.onStart(async () => {
  try {
    const mongoPromise = mongoose
      .set('strictQuery', false)
      .connect(MONGO.URL(), {
        dbName: MONGO.NAME,
        authSource: MONGO.AUTH_SOURCE,
        authMechanism: 'SCRAM-SHA-1'
      });

    await Promise.all([mongoPromise]);
  } catch (error) {
    logger.log(error);
    throw error;
  }
});

application.listenAsync(SERVER.PORT, () => {
  logger.log({
    level: 'info',
    message: `Server is running on port: ${SERVER.PORT}`
  });
});
