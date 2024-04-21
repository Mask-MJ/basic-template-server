import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { RecordLogService } from 'src/monitor/record-log/record-log.service';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { MinioService } from 'src/common/server/minio.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly recordLogService: RecordLogService,
    private readonly minioClient: MinioService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { account: createUserDto.account },
    });
    if (existingUser) {
      throw new ConflictException('账号已存在');
    }
    return await this.prisma.user.create({
      data: {
        account: createUserDto.account,
        password: await this.hashingService.hash(createUserDto.password),
        nickname: createUserDto.nickname,
        roles: { connect: createUserDto.roles?.map((id) => ({ id })) },
      },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryUserDto: QueryUserDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { account, nickname, status, beginTime, endTime } = queryUserDto;
    const where = {
      account: { contains: account },
      nickname: { contains: nickname },
      status,
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { roles: true },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data, total, page, pageSize };
  }

  findSelf(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        roles: { include: { menus: { include: { permissions: true } } } },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { roles: true },
    });

    return {
      ...user,
      password: undefined,
      roles: user.roles.map((role) => role.id),
    };
  }

  async changePassword(id: number, password: string, oldPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new ConflictException('用户不存在');
    }
    // 判断是否是管理员权限 如果是管理员权限则不需要验证原密码
    if (user.isAdmin) {
      return this.prisma.user.update({
        where: { id },
        data: { password: await this.hashingService.hash(password) },
      });
    }
    const isPasswordValid = await this.hashingService.compare(
      oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ConflictException('原密码错误');
    }
    const newPassword = await this.hashingService.hash(password);
    return this.prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        roles: {
          connect: updateUserDto.roles?.map((roleId) => ({ id: roleId })),
        },
      },
    });
  }

  async remove(user: ActiveUserData, id: number) {
    const userToDelete = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    const deleteUser = await this.prisma.user.delete({ where: { id } });
    await this.recordLogService.create({
      userId: user.sub,
      account: user.account,
      module: '用户管理',
      action: '删除',
      message: '删除用户',
      detail: `删除用户名为 ${userToDelete.nickname}, 账号为 ${userToDelete.account} 的用户`,
    });
    return deleteUser;
  }

  async uploadAvatar(user: ActiveUserData, file: Express.Multer.File) {
    await this.minioClient.uploadFile('avatar', file.originalname, file.buffer);

    return this.prisma.user.update({
      where: { id: user.sub },
      data: {
        avatar: `http://39.105.100.190:9000/avatar/${file.originalname}`,
      },
    });
  }
}
