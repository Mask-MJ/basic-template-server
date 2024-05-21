import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from 'src/iam/config/jwt.config';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { RecordLogService } from 'src/monitor/record-log/record-log.service';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { OnlineController } from './online/online.controller';
import { OnlineService } from './online/online.service';
import { OnlineIdsStorage } from './online/online-ids.storage';
import { DeptController } from './dept/dept.controller';
import { DeptService } from './dept/dept.service';
import { DictController } from './dict/dict.controller';
import { DictService } from './dict/dict.service';
import { DictDataController } from './dict-data/dict-data.controller';
import { DictDataService } from './dict-data/dict-data.service';
import { MinioService } from 'src/common/server/minio.service';
import { UnitController } from './unit/unit.controller';
import { UnitService } from './unit/unit.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [
    UserController,
    MenuController,
    RoleController,
    OnlineController,
    DeptController,
    DictController,
    DictDataController,
    UnitController,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
    MenuService,
    RoleService,
    OnlineService,
    OnlineIdsStorage,
    DeptService,
    DictService,
    RecordLogService,
    DictDataService,
    MinioService,
    UnitService,
  ],
})
export class SystemModule {}
