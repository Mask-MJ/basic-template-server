import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { PrismaService } from 'nestjs-prisma';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { Menu, Permission } from '@prisma/client';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const contextPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!contextPermissions) return true;
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    const userInfo = await this.prismaService.user.findUnique({
      where: { id: user.sub },
      include: {
        roles: { include: { menus: { include: { permissions: true } } } },
      },
    });
    console.log(userInfo);
    if (!userInfo) return false;
    const permissionsName = userInfo.roles
      .reduce((acc, role) => acc.concat(role.menus), [] as Menu[])
      // .reduce((acc, menu) => acc.concat(menu.permissions), [] as Permission[])
      .map((p) => p.name);
    // const permissionsName = userInfo.roles
    //   .reduce((acc, role) => acc.concat(role.permissions), [] as Permission[])
    //   .map((p) => p.name);
    // console.log(permissionsName);

    return contextPermissions.every((permission) =>
      permissionsName.includes(permission),
    );
  }
}
