import { Contract as ContractEntity } from '@prisma/client';
export class Contract implements ContractEntity {
  id: number;
  name: string;
  contractTime: Date;
  valveCount: number;
  highValveCount: number;
  customer: string;
  customerPhone: string;
  saler: string;
  remark: string;
  factoryId: number;
  createrId: number;
  createdAt: Date;
  updatedAt: Date;
}
