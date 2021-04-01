import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateCommentBodyDto {
  author: string;
  article:string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  text: string;
}
