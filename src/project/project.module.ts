import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { ValveController } from './valve/valve.controller';
import { FactoryService } from './factory/factory.service';
import { ValveService } from './valve/valve.service';
import { DeviceService } from './device/device.service';
import { DeviceController } from './device/device.controller';
import { ContractController } from './contract/contract.controller';
import { ContractService } from './contract/contract.service';
import { AnalysisTaskController } from './analysis-task/analysis-task.controller';
import { AnalysisTaskService } from './analysis-task/analysis-task.service';

@Module({
  imports: [],
  controllers: [
    FactoryController,
    DeviceController,
    ValveController,
    ContractController,
    AnalysisTaskController,
  ],
  providers: [
    FactoryService,
    DeviceService,
    ValveService,
    ContractService,
    AnalysisTaskService,
  ],
})
export class ProjectModule {}
