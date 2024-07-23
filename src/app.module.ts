import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, BooksModule],
  exports: [ConfigModule.forRoot()],
})
export class AppModule {}
