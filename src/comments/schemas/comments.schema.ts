import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ModelName } from '../../shared/constants/common-constants';

export type CommentsModel = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({
    required: true,
    type: String,
    lowercase: true,
  })
  text: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ModelName.ARTICLE_MODEL_NAME,
  })
  article: Types.ObjectId;
 
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ModelName.USER_MODEL_NAME,
  })
  author: Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comment).set(
  'toJSON',
  {
    transform: (doc, { __v, ...rest }) => rest,
  },
);
