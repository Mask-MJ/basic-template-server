import { Injectable, ConflictException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryRoleDto } from './dto/query-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRoleKey = await this.prisma.role.findUnique({
      where: { value: createRoleDto.value },
    });
    if (existingRoleKey) {
      throw new ConflictException('角色键已存在');
    }
    return this.prisma.role.create({
      data: {
        ...createRoleDto,
        menus: { connect: createRoleDto.menus?.map((id) => ({ id })) },
      },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryRoleDto: QueryRoleDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, value, beginTime, endTime } = queryRoleDto;
    const where = {
      name: { contains: name },
      value: { contains: value },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.role.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { menus: true },
      }),
      this.prisma.role.count({ where }),
    ]);

    return { data, total, page, pageSize };
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUniqueOrThrow({
      where: { id },
      include: { menus: true },
    });

    return { ...role, menus: role.menus.map((menu) => menu.id) };
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: {
        ...updateRoleDto,
        menus: { connect: updateRoleDto.menus?.map((id) => ({ id })) },
      },
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
