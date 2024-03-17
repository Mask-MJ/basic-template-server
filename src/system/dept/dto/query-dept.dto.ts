import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import * as dayjs from 'dayjs';

export class QueryDeptDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  beginTime?: Date;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  endTime?: Date;
}
