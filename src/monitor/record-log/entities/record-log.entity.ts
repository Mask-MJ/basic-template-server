import { RecordLog as RecordEntity } from '@prisma/client';

export class RecordLog implements RecordEntity {
  id: number;
  userId: number;
  account: string;
  action: string;
  module: string;
  message: string;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}
