import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 8, maxlength: 64, select: false })
  password: string;

  @Prop({ default: '' })
  verificationToken: string;

  @Prop({ default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
