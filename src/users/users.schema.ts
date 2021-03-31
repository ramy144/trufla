import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserModel = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    index: { unique: true },
    required: true,
  })
  email: string;

  @Prop({
    select: false,
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  job_title: string;
}

export const UsersSchema = SchemaFactory.createForClass(User).set('toJSON', {
  transform: (doc, { __v, password, ...rest }) => rest,
})
