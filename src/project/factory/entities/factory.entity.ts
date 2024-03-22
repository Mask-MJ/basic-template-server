import { Factory as FactoryEntity } from '@prisma/client';

export class Factory implements FactoryEntity {
  id: number;
  name: string;
  address: string;
  location: number[];
  status: number;
  remark: string;
  parentId: number | null;
  createrId: number;
  createdAt: Date;
  updatedAt: Date;
}
