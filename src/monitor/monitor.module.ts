import { Module } from '@nestjs/common';
import { LoginLogController } from './login-log/login-log.controller';
import { LoginLogService } from './login-log/login-log.service';
import { RecordLogController } from './record-log/record-log.controller';
import { RecordLogService } from './record-log/record-log.service';

@Module({
  controllers: [RecordLogController, LoginLogController],
  providers: [RecordLogService, LoginLogService],
})
export class MonitorModule {}
