import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryMenuDto } from './dto/query-menu.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    const existingMenu = await this.prisma.menu.findUnique({
      where: { name: createMenuDto.name },
    });
    if (existingMenu) {
      throw new ConflictException('菜单名已存在');
    }
    // 把 / 替换成 :
    const suffix = createMenuDto.path.replace(/\//g, ':');
    return this.prisma.menu.create({
      data: {
        ...createMenuDto,
        permissions: {
          createMany: {
            data: [
              { name: '创建', value: 'create' + suffix },
              { name: '读取', value: 'read' + suffix },
              { name: '更新', value: 'update' + suffix },
              { name: '删除', value: 'delete' + suffix },
            ],
          },
        },
      },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryMenuDto: QueryMenuDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, status, beginTime, endTime } = queryMenuDto;
    const where = {
      name: { contains: name },
      status,
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.menu.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { permissions: true },
      }),
      this.prisma.menu.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUniqueOrThrow({
      where: { id },
      include: { permissions: true },
    });
    return {
      ...menu,
      permissions: menu.permissions.map((permission) => permission.id),
    };
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
