import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, BooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
