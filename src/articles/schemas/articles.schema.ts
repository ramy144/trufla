import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ModelName } from '../../shared/constants/common-constants';

export type ArticleModel = Article & Document;

@Schema({
  timestamps: true,
})
export class Article {
  @Prop({
    required: true,
    type: String,
    lowercase: true,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  body: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: ModelName.USER_MODEL_NAME,
  })
  author: Types.ObjectId;
}

export const ArticlesSchema = SchemaFactory.createForClass(Article).set(
  'toJSON',
  {
    transform: (doc, { __v, ...rest }) => rest,
  },
);
