import { Module } from '@nestjs/common';
import { SystemModule } from 'src/system/system.module';
import { IamModule } from 'src/iam/iam.module';
import { RouterModule } from '@nestjs/core';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    SystemModule,
    IamModule,
    RouterModule.register([{ path: 'system', module: SystemModule }]),
  ],
  controllers: [],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
