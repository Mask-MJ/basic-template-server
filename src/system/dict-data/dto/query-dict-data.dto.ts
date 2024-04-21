import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as dayjs from 'dayjs';

export class QueryDictDataDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  dictId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  beginTime?: Date;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  endTime?: Date;
}
