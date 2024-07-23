import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/HttpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000, 'localhost');

  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
