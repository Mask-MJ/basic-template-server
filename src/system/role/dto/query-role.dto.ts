import { IsOptional, IsString } from 'class-validator';

export class QueryRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  value?: string;
}
