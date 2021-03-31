import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IRequestWithJwtData } from 'src/auth/interfaces/jwt.interface';
import { FindAllUsersDto } from './dtos/find-all-users.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/me')
  async findMe(@Req() request: IRequestWithJwtData): Promise<User> {
    return request.user;
  }

  @Get()
  async findAllUsers(@Query() findAllUsersDto: FindAllUsersDto): Promise<any> {
    const paginatedResponse = await this.usersService.findUsersPaginated(
      findAllUsersDto,
    );

    return paginatedResponse;
  }

  @Get("/:userId")
  async findUserById(
      @Param("userId") userId: string,
  ) {
      return await this.usersService.findOne({_id:userId})
  }
}
