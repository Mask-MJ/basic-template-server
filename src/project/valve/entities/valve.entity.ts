import { Valve as ValveEntity } from '@prisma/client';

export class Valve implements ValveEntity {
  id: number;
  name: string;
  brand: string;
  model: string;
  serial: string;
  caliber: string;
  level: string;
  material: string;
  leak: string;
  actuator: string;
  locator: string;
  fault: string;
  deviceId: number;
  status: number;
  remark: string;
  factoryId: number;
  createrId: number;
  createdAt: Date;
  updatedAt: Date;
}
