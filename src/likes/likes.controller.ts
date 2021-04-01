import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IRequestWithJwtData } from 'src/auth/interfaces/jwt.interface';
import { CreateLikeBodyDto } from './dtos/like.dto';
import { LikesService } from './likes.service';
import { LikesModel } from './schemas/likes.schema';

@ApiTags('Likes')
@Controller('/articles/:articleId/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createArticle(
    @Param('articleId') articleId: string,
    @Body() createLikeBody: CreateLikeBodyDto,
    @Req() request: IRequestWithJwtData,
  ): Promise<LikesModel> {
    const likedDocument = await this.likesService.likeArticle(
      createLikeBody,
      request.user,
      articleId,
    );

    return likedDocument;
  }
}
