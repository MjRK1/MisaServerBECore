import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: '*',
  });
 await app.listen(process.env.PORT); // for local hosting
 //  await app.listen(5000);
}


bootstrap();
