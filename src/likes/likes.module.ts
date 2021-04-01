import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from 'src/articles/articles.module';
import { ModelName } from 'src/shared/constants/common-constants';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesRepo } from './repos/likes.repo';
import { LikesSchema } from './schemas/likes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.LIKES_MODEL_NAME,
        schema: LikesSchema,
      },
    ]),
    ArticlesModule  
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepo],
  exports: [LikesService],
})
export class LikesModule {}
