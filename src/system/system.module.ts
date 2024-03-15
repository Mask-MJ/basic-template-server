import { Module } from '@nestjs/common';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { HashingService } from 'src/iam/hashing/hashing.service';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { OnlineController } from './online/online.controller';
import { OnlineService } from './online/online.service';
import { OnlineIdsStorage } from './online/online-ids.storage';
import { LogController } from './log/log.controller';
import { LogService } from './log/log.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

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
    LogController,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
    MenuService,
    RoleService,
    OnlineService,
    OnlineIdsStorage,
    LogService,
  ],
})
export class SystemModule {}
