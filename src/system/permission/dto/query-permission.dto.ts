import { IsOptional, IsString } from 'class-validator';

export class QueryPermissionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;
}
