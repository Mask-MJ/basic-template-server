export class CreateRecordLogDto {
  userId: number;
  account: string;
  action: string;
  module: string;
  message: string;
  detail: string;
}
