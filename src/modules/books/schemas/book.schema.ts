import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ default: '' })
  owner: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
