import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, BooksModule, UsersModule],
  exports: [ConfigModule.forRoot()],
})
export class AppModule {}
