import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail,IsString } from 'class-validator';
import { IsDuplicated } from 'src/shared/erros/ email-duplication.error';

export class SignUpDto {
  readonly stripe_account_id?: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  @IsDuplicated({ message: 'email is already in use' })
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  job_title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}
