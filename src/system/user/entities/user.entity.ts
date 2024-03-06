import { User as UserEntity } from '@prisma/client';
export class User implements UserEntity {
  id: number;
  isAdmin: boolean;
  account: string;
  password: string;
  nickname: string | null;
  email: string | null;
  avatar: string | null;
  phoneNumber: string | null;
  sex: number;
  status: number;
  deptId: number | null;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
