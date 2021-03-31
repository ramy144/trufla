import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelName } from 'src/shared/constants/common-constants';
import { BaseRepository } from 'src/shared/db/base.repo';
import { ArticleModel } from '../schemas/articles.schema';

@Injectable()
export class ArticlesRepo extends BaseRepository<ArticleModel> {
  constructor(
    @InjectModel(ModelName.ARTICLE_MODEL_NAME)
    private readonly _articleModel: Model<ArticleModel>,
  ) {
    super(_articleModel);
  }
}
