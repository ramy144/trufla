import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IRequestWithJwtData } from 'src/auth/interfaces/jwt.interface';
import { CommentsService } from './comments.service';
import { CreateCommentBodyDto } from './dtos/create-comment.dto';
import { CommentsModel } from './schemas/comments.schema';
@ApiTags('Comments')
@Controller('/articles/:articleId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createArticle(
    @Param('articleId') articleId: string,
    @Body() createArticleBody: CreateCommentBodyDto,
    @Req() request: IRequestWithJwtData,
  ): Promise<CommentsModel> {
    const createdComment = await this.commentsService.createComments(
      createArticleBody,
      request.user,
      articleId,
    );

    return createdComment;
  }
}
