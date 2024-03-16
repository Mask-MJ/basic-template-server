import { IsNumber, IsString } from 'class-validator';

export class CreateLogDto {
  @IsNumber()
  userId: number;

  @IsString()
  account: string;

  @IsString()
  ip: string;

  @IsString()
  userAgent: string;
}
