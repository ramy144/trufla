import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined } from 'class-validator';

export class CreateLikeBodyDto {
  user: string;
  article: string;

  @ApiProperty()
  @IsDefined()
  @IsBoolean()
  isLiked: boolean;
}
