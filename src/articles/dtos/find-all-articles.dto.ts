import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export class FindAllArticlesDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDefined()
  title?: string;

  @ApiPropertyOptional({
    enum:['THUMBS_UP']
  })
  @IsOptional()
  @IsDefined()
  sort?: string;
}
