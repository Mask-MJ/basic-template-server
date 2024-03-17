import { LoginLog as LoginLogEntity } from '@prisma/client';

export class LoginLog implements LoginLogEntity {
  id: number;
  userId: number;
  account: string;
  ip: string;
  address: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}
