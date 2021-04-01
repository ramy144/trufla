import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LogInDto } from './dtos/signin.dtos';
import { SignUpDto } from './dtos/signup.dtos';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IJwtData, IRequestWithJwtData } from './interfaces/jwt.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: IRequestWithJwtData,
    @Body() body: LogInDto,
  ): Promise<IJwtData> {
    const jwtData = request.user;

    return jwtData;
  }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto): Promise<{token:string}> {
    const token = await this.authService.signup(signUpDto);

    return token;
  }
}
