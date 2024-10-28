import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

async function bootstrapLambda(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  server = server ?? (await bootstrapLambda());
  return server(event, context, callback);
};

if (process.env.IS_OFFLINE) {
  bootstrap();
}
