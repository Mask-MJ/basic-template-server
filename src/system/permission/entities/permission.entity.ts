import { Permission as PermissionEntity } from '@prisma/client';
export class Permission implements PermissionEntity {
  id: number;
  name: string;
  value: string;
  remark: string | null;
  menuId: number;
  createdAt: Date;
  updatedAt: Date;
}
