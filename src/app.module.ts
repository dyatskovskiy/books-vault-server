import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, BooksModule],
})
export class AppModule {}
