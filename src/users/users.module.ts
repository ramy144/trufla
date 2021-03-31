import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ModelName } from 'src/shared/constants/common-constants';
import { UsersRepo } from './repos/user.repo';
import { UsersController } from './users.controller';
import { UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelName.USER_MODEL_NAME,
        schema: UsersSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy,UsersRepo],
  exports: [UsersService],
})
export class UsersModule {}
