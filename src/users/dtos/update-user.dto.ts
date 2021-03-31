import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDefined()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDefined()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDefined()
  user_name?: string;
}
