import { Type, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import * as dayjs from 'dayjs';

export class QueryLogDto {
  @IsOptional()
  @IsString()
  account?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  beginTime?: Date;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  endTime?: Date;
}
