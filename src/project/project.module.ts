import { Module } from '@nestjs/common';
import { FactoryController } from './factory/factory.controller';
import { ValveController } from './valve/valve.controller';
import { FactoryService } from './factory/factory.service';
import { ValveService } from './valve/valve.service';

@Module({
  imports: [],
  controllers: [FactoryController, ValveController],
  providers: [FactoryService, ValveService],
})
export class ProjectModule {}
