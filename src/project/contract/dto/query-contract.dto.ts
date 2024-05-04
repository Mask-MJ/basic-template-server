import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryContractDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  saler?: string;

  @IsOptional()
  @Type(() => Number)
  factoryId?: number;
}
