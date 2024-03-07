import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';
import { HashingService } from 'src/iam/hashing/hashing.service';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';

@Module({
  imports: [RouterModule.register([{ path: 'system', module: SystemModule }])],
  controllers: [
    UserController,
    MenuController,
    RoleController,
    PermissionController,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
    MenuService,
    RoleService,
    PermissionService,
  ],
})
export class SystemModule {}
