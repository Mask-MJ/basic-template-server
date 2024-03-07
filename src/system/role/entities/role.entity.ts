import { Role as RoleEntity } from '@prisma/client';
export class Role implements RoleEntity {
  id: number;
  name: string;
  value: string;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
  users: number[];
  menus: number[];
}
