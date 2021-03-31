import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelName } from 'src/shared/constants/common-constants';
import { ArticlesController } from './articles.controller';
import { ArticleService } from './articles.service';
import { ArticlesRepo } from './repos/articles.repo';
import { ArticlesSchema } from './schemas/articles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.ARTICLE_MODEL_NAME,
        schema: ArticlesSchema,
      },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticleService, ArticlesRepo],
  exports: [ArticleService],
})
export class ArticlesModule {}
