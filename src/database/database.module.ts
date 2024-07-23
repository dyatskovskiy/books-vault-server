import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.provider';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dyatskovskiy:13121488@myclaster.ui75sxy.mongodb.net/books-vault',
    ),
  ],
  providers: [...DatabaseProviders],
})
export class DatabaseModule {}
