import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @Prop({ required: true })
  author: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ default: false })
  isCompleted: boolean;

  @ApiProperty()
  @Prop({ default: [] })
  tags: string[];

  @ApiProperty()
  @Prop({ default: '' })
  imageUrl: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Schema.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
