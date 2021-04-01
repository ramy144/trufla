import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from 'src/users/users.schema';
import { CreateArticleBodyDto } from './dtos/create-article.dto';
import { FindAllArticlesDto } from './dtos/find-all-articles.dto';
import { ArticlesRepo } from './repos/articles.repo';
import { ArticleModel } from './schemas/articles.schema';

@Injectable()
export class ArticleService {
  constructor(private readonly _articlesRepo: ArticlesRepo) {}

  async createArticles(
    createArticleBody: CreateArticleBodyDto,
    user: User,
  ): Promise<ArticleModel> {
    await this._checkDuplication(createArticleBody.title);
    const article = await this._articlesRepo.create({
      ...createArticleBody,
      author: (user as UserModel)._id,
    });

    return article;
  }

  private async _checkDuplication(title: string): Promise<void> {
    const article = await this._articlesRepo.findOne({
      title: title.toLowerCase(),
    });

    if (article) {
      throw new ConflictException(
        'there is another article with the same name',
      );
    }
  }

  async findArticleById(articleId: string): Promise<ArticleModel> {
    const article = await this._articlesRepo.model
      .findById(articleId)
      .populate('author');
    if (!article) {
      throw new NotFoundException('article not found');
    }
    return article;
  }

  async findArticlesPaginated(
    findAllDto: FindAllArticlesDto,
  ): Promise<{
    data: ArticleModel[];
    totalCount: number;
    pageCount: number;
    page: number;
    limit: number;
  }> {
    const page = +findAllDto.page || 1;
    const limit = +findAllDto.limit || 10;
    const query: FilterQuery<ArticleModel> = {};

    if (findAllDto.title) {
      query.title = { $regex: new RegExp(findAllDto.title.toLowerCase(), 'i') };
    }

    const articles = await this._articlesRepo.findPaginated(
      query,
      page,
      limit,
      { _id: -1 },
      {
        path:'author'
      }
    );

    return articles;
  }
}
