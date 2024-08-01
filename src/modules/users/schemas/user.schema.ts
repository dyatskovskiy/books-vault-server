import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.verificationToken;
      return ret;
    },
  },
})
export class User {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8, maxlength: 64, select: false })
  password: string;

  @Prop({ default: '' })
  verificationToken: string;

  @ApiProperty()
  @Prop({ default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
