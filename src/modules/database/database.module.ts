import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  providers: [...DatabaseProviders],
})
export class DatabaseModule {}
