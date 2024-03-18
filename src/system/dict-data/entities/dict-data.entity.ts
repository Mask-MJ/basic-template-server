import { DictData as DictDataEntity } from '@prisma/client';

export class DictData implements DictDataEntity {
  id: number;
  dictId: number;
  name: string;
  value: string;
  sort: number;
  remark: string | null;
  createdAt: Date;
  updatedAt: Date;
}
