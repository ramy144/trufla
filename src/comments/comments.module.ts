import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from 'src/articles/articles.module';
import { ModelName } from 'src/shared/constants/common-constants';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepo } from './repos/comments.repo';
import { CommentsSchema } from './schemas/comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.COMMENT_MODEL_NAME,
        schema: CommentsSchema,
      },
    ]),
    ArticlesModule  
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepo],
  exports: [CommentsService],
})
export class CommentsModule {}
