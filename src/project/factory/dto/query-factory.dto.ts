import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryFactoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @IsEnum([0, 1])
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  all?: number = 0;
}
