import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/HttpException.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Books management API')
    .setDescription(
      'This API allows you to manage books in a library, including creating, reading, updating, and deleting book records. It also supports user management and book categorization.',
    )
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = +process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
