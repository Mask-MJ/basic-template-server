import { LoginLog } from '@prisma/client';

export class Log implements LoginLog {
  id: number;
  userId: number;
  account: string;
  ip: string;
  address: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
  user: number;
}
