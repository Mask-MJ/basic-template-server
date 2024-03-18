import { Dict as DictEntity } from '@prisma/client';

export class Dict implements DictEntity {
  id: number;
  name: string;
  value: string;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
