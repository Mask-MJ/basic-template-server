import { Unit as UnitEntity } from '@prisma/client';

export class Unit implements UnitEntity {
  id: number;
  name: string;
  value: string;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
