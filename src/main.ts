import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupSwagger } from './api-docs.swagger';
import * as dotenv from 'dotenv';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app-logging';
import { Logger, NestApplicationOptions } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const logger =
    process.env.NODE_ENV === 'production'
      ? WinstonModule.createLogger(winstonOptions)
      : new Logger('Custom Bootstrap Logger');

  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
  };

  const app = await NestFactory.create(AppModule, nestAppOptions);

  /* Global Prefix Route */
  app.setGlobalPrefix('api/v1');

  // CORS
  app.enableCors();

  // Swagger APIs docs
  setupSwagger(app);

  /** different deployment environments */
  if (process.env.NODE_ENV === 'development') {
    logger.debug(`Application is running in "${process.env.NODE_ENV}" mode`);
  } else {
    /**
     * TODO: implement
     */
    logger.debug(`Application is running in "${process.env.NODE_ENV}" mode`);
  }

  /* Listening Port */
  const port = process.env.SERVER_PORT || 5000;
  await app.listen(port);
  logger.debug(`Application listening on port ${port}`);
}
bootstrap();
