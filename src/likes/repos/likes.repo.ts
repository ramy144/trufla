import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelName } from 'src/shared/constants/common-constants';
import { BaseRepository } from 'src/shared/db/base.repo';
import { LikesModel } from '../schemas/likes.schema';

@Injectable()
export class LikesRepo extends BaseRepository<LikesModel> {
  constructor(
    @InjectModel(ModelName.LIKES_MODEL_NAME)
    private readonly _likesModel: Model<LikesModel>,
  ) {
    super(_likesModel);
  }
}
