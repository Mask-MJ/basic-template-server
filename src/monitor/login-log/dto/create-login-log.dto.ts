import { IsNumber, IsString } from 'class-validator';

export class CreateLoginLogDto {
  @IsNumber()
  userId: number;

  @IsString()
  account: string;

  @IsString()
  ip: string;

  @IsString()
  userAgent: string;
}
