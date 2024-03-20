import { Dept as DeptEntity } from '@prisma/client';

export class Dept implements DeptEntity {
  id: number;
  name: string;
  status: number;
  sort: number;
  parentId: number;
  remark: string | null;
  // children: Dept[];
  createdAt: Date;
  updatedAt: Date;
}
