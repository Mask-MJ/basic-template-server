import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  oldPassword: string = '';

  @IsString()
  password: string;
}
