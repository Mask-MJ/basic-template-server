import { ConflictException, Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { QueryFactoryDto } from './dto/query-factory.dto';

@Injectable()
export class FactoryService {
  constructor(private prisma: PrismaService) {}

  async create(user: ActiveUserData, createFactoryDto: CreateFactoryDto) {
    const existingFactory = await this.prisma.factory.findUnique({
      where: { name: createFactoryDto.name },
    });
    if (existingFactory) {
      throw new ConflictException('工厂已存在');
    }
    return await this.prisma.factory.create({
      data: {
        ...createFactoryDto,
        createrId: user.sub,
        users: {
          connect: createFactoryDto.users
            ?.map((id) => ({ id }))
            .concat({ id: user.sub }),
        },
        valves: {
          connect: createFactoryDto.valves?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll(
    user: ActiveUserData,
    paginationQueryDto: PaginationQueryDto,
    queryFactoryDto: QueryFactoryDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, status } = queryFactoryDto;
    // const userInfo = await this.prisma.user.findUnique({
    //   where: { id: user.sub },
    //   include: { roles: true },
    // });
    // const hasAdmin = userInfo?.roles.some((role) => role.value === 'admin');
    // 管理员可以查看所有工厂
    const where = {
      name: { contains: name },
      status,
    };
    const [data, total] = await Promise.all([
      this.prisma.factory.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { users: true },
      }),
      this.prisma.factory.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  async findOne(id: number) {
    const factory = await this.prisma.factory.findUniqueOrThrow({
      where: { id },
      include: { users: true },
    });
    return {
      ...factory,
      users: factory.users.map((user) => user.id),
    };
  }

  update(id: number, updateFactoryDto: UpdateFactoryDto) {
    return this.prisma.factory.update({
      where: { id },
      data: {
        ...updateFactoryDto,
        users: {
          set: updateFactoryDto.users?.map((userId) => ({ id: userId })),
        },
        valves: {
          connect: updateFactoryDto.valves?.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.factory.delete({ where: { id } });
  }
}
