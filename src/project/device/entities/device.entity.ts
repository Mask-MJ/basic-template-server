import { Device as DeviceEntity } from '@prisma/client';

export class Device implements DeviceEntity {
  id: number;
  name: string;
  status: number;
  remark: string;
  factoryId: number;
  createrId: number;
  createdAt: Date;
  updatedAt: Date;
}
