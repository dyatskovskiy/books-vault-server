import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '@src/modules/users/schemas/user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
