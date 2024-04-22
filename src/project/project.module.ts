import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { ValveController } from './valve/valve.controller';
import { FactoryService } from './factory/factory.service';
import { ValveService } from './valve/valve.service';
import { DeviceService } from './device/device.service';
import { DeviceController } from './device/device.controller';

@Module({
  imports: [],
  controllers: [FactoryController, DeviceController, ValveController],
  providers: [FactoryService, DeviceService, ValveService],
})
export class ProjectModule {}
