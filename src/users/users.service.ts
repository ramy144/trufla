import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { FilterQuery } from 'mongoose';
import { SignUpDto } from '../auth/dtos/signup.dtos';
import { FindAllUsersDto } from './dtos/find-all-users.dto';
import { UsersRepo } from './repos/user.repo';
import { UserModel } from './users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async createUser(body: SignUpDto) {
    const user = await this.usersRepo.model.create({
      ...body,
      password: await hash(body.password, 10),
    });

    return user;
  }

  async exists(query: FilterQuery<UserModel>) {
    return await this.usersRepo.model.exists(query);
  }

  async findOne(query: FilterQuery<UserModel>) {
    return await this.usersRepo.model.findOne(query);
  }

  async findUserPassword(query: FilterQuery<UserModel>) {
    return await this.usersRepo.model.findOne(query).select('password');
  }

  async findUsersPaginated(
    findAllUsersDto: FindAllUsersDto,
  ): Promise<{
    data: UserModel[];
    totalCount: number;
    pageCount: number;
    page: number;
    limit: number;
  }> {
    const page = +findAllUsersDto.page || 1;
    const limit = +findAllUsersDto.limit || 10;
    const query = {};
    const users = await this.usersRepo.findPaginated(query, page, limit,{_id:-1});

    return users;
  }
}
