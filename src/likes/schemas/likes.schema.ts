import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ModelName } from '../../shared/constants/common-constants';

export type LikesModel = Like & Document;

@Schema({
  timestamps: true,
})
export class Like {
  @Prop({
    type: Boolean,
    required: true,
  })
  isLiked: string;

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
  user: Types.ObjectId;
}

export const LikesSchema = SchemaFactory.createForClass(Like).set('toJSON', {
  transform: (doc, { __v, ...rest }) => rest,
});
