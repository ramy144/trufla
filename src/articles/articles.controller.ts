import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IRequestWithJwtData } from 'src/auth/interfaces/jwt.interface';
import { ArticleService } from './articles.service';
import { CreateArticleBodyDto } from './dtos/create-article.dto';
import { FindAllArticlesDto } from './dtos/find-all-articles.dto';
import { ArticleModel } from './schemas/articles.schema';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticleService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createArticle(
    @Body() createArticleBody: CreateArticleBodyDto,
    @Req() request: IRequestWithJwtData,
  ): Promise<ArticleModel> {
    const createdArticle = await this.articlesService.createArticles(
      createArticleBody,
      request.user,
    );

    return createdArticle;
  }

  @Get('/:articleId')
  async findById(@Param('articleId') articleId: string):Promise<ArticleModel> {
    return await this.articlesService.findArticleById(articleId);
  }

  @Get()
  async findAll(
    @Query() findAllDto: FindAllArticlesDto,
  ): Promise<{
    data: ArticleModel[];
    totalCount: number;
    pageCount: number;
    page: number;
    limit: number;
  }> {
    const paginatedResponse = await this.articlesService.findArticlesPaginated(
      findAllDto,
    );

    return paginatedResponse;
  }
}
