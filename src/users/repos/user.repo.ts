import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelName } from 'src/shared/constants/common-constants';
import { BaseRepository } from 'src/shared/db/base.repo';
import { UserModel } from '../users.schema';

@Injectable()
export class UsersRepo extends BaseRepository<UserModel> {
  constructor(
    @InjectModel(ModelName.USER_MODEL_NAME)
    private readonly _userModel: Model<UserModel>,
  ) {
    super(_userModel);
  }

}
