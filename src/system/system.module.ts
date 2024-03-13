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

@Module({
  imports: [],
  controllers: [
    UserController,
    MenuController,
    RoleController,
    OnlineController,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
    MenuService,
    RoleService,
    OnlineService,
    OnlineIdsStorage,
  ],
})
export class SystemModule {}
