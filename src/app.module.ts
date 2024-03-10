import { Module } from '@nestjs/common';
import { SystemModule } from 'src/system/system.module';
import { IamModule } from 'src/iam/iam.module';
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
  ],
  controllers: [],
  providers: [providePrismaClientExceptionFilter()],
})
export class AppModule {}
