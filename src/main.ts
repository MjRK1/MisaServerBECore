import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001); // for local hosting
  // await app.listen(5000);
}


bootstrap();
