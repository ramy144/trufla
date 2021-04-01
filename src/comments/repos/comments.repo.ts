import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelName } from 'src/shared/constants/common-constants';
import { BaseRepository } from 'src/shared/db/base.repo';
import { CommentsModel } from '../schemas/comments.schema';

@Injectable()
export class CommentsRepo extends BaseRepository<CommentsModel> {
  constructor(
    @InjectModel(ModelName.COMMENT_MODEL_NAME)
    private readonly _commentModel: Model<CommentsModel>,
  ) {
    super(_commentModel);
  }
}
