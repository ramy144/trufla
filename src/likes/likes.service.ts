import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/articles/articles.service';
import { User, UserModel } from 'src/users/users.schema';
import { CreateLikeBodyDto } from './dtos/like.dto';
import { LikesRepo } from './repos/likes.repo';
import { LikesModel } from './schemas/likes.schema';

@Injectable()
export class LikesService {
  constructor(
    private readonly _likesRepo: LikesRepo,
    private readonly _articlesService:ArticleService
    ) {}

  async likeArticle(
    createCommentBody: CreateLikeBodyDto,
    user: User,
    articleId: string,
  ): Promise<LikesModel> {

    await this._articlesService.findArticleById(articleId)
    
    let likedArticle = await this._likesRepo.findOne({
      article: articleId,
      user: (user as UserModel)._id,
      isLiked:true
    })
    console.log("🚀 ~ file: likes.service.ts ~ line 28 ~ LikesService ~ likedArticle", likedArticle)

    if(!likedArticle){
      
      likedArticle = await this._likesRepo.create({
        ...createCommentBody,
        article: articleId,
        user: (user as UserModel)._id,
      });

      await this._articlesService.updateById(
        articleId,
        {
          $inc:{
            likesCount:1
          }
        }
        )
    }
   

    return likedArticle;
  }

  
}
