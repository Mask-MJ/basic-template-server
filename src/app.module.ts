import { Module, Logger } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';

import { IamModule } from 'src/iam/iam.module';
import { SystemModule } from 'src/system/system.module';
import { MonitorModule } from 'src/monitor/monitor.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    SystemModule,
    IamModule,
    RouterModule.register([
      { path: 'project', module: ProjectModule },
      { path: 'system', module: SystemModule },
      { path: 'monitor', module: MonitorModule },
    ]),
    MonitorModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [Logger, providePrismaClientExceptionFilter()],
})
export class AppModule {}
