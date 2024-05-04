import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { ValveController } from './valve/valve.controller';
import { FactoryService } from './factory/factory.service';
import { ValveService } from './valve/valve.service';
import { DeviceService } from './device/device.service';
import { DeviceController } from './device/device.controller';
import { ContractController } from './contract/contract.controller';
import { ContractService } from './contract/contract.service';
@Module({
  imports: [],
  controllers: [
    FactoryController,
    DeviceController,
    ValveController,
    ContractController,
  ],
  providers: [FactoryService, DeviceService, ValveService, ContractService],
})
export class ProjectModule {}
