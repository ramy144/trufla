import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserModel } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signup.dtos';
import { IJwtData } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateToken(
    data: Partial<IJwtData>,
    options?: JwtSignOptions,
  ): Promise<string> {
    const token = this.jwtService.sign(data, options);

    return token;
  }

  async validateUser(id: string): Promise<UserModel> {
    const isUserExist = await this.usersService.findOne({
      _id: id,
    });
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 29 ~ AuthService ~ validateUser ~ isUserExist',
      isUserExist,
    );

    return isUserExist;
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findUserPassword({ email });

    if (!user) {
      throw new UnauthorizedException('password or email is incorrect');
    }

    const passwordOk = await compare(password, user.password);

    if (!passwordOk) {
      throw new UnauthorizedException('password or email is incorrect');
    }

    const tokenPayload: Partial<IJwtData> = {
      id: user._id,
    };
    const token = await this.generateToken(tokenPayload);

    return { token };
  }

  async signup(body: SignUpDto) {
    const createdUser = await this.usersService.createUser(body);
    
    const token = await this.generateUserToken(createdUser._id);

    return token;
  }

  private async generateUserToken(user: { _id: string }) {
    const tokenPayload: Partial<IJwtData> = {
      id: user._id,
    };
    const token = await this.generateToken(tokenPayload);

    return { token };
  }
}
