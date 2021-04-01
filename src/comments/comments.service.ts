import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/articles/articles.service';
import { User, UserModel } from 'src/users/users.schema';
import { CreateCommentBodyDto } from './dtos/create-comment.dto';
import { CommentsRepo } from './repos/comments.repo';
import { CommentsModel } from './schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    private readonly _commentsRepo: CommentsRepo,
    private readonly _articlesService:ArticleService
    ) {}

  async createComments(
    createCommentBody: CreateCommentBodyDto,
    user: User,
    articleId: string,
  ): Promise<CommentsModel> {

    await this._articlesService.findArticleById(articleId)
    
    const comment = await this._commentsRepo.create({
      ...createCommentBody,
      article: articleId,
      author: (user as UserModel)._id,
    });

    return comment;
  }
}
