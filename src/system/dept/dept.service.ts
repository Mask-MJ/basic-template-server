import { Injectable } from '@nestjs/common';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDeptDto } from './dto/query-dept.dto';
import { PrismaService } from 'nestjs-prisma';
import { transformTree } from 'src/common/utils/transformTree';

@Injectable()
export class DeptService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDeptDto: CreateDeptDto) {
    return this.prisma.dept.create({ data: createDeptDto });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryDeptDto: QueryDeptDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, status, beginTime, endTime } = queryDeptDto;
    const where = {
      name: { contains: name },
      status,
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.dept.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        // include: { children: true },
      }),
      this.prisma.dept.count({ where }),
    ]);
    return { data: transformTree(data), total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.dept.findUnique({ where: { id } });
  }

  update(id: number, updateDeptDto: UpdateDeptDto) {
    return this.prisma.dept.update({ where: { id }, data: updateDeptDto });
  }

  remove(id: number) {
    return this.prisma.dept.delete({ where: { id } });
  }
}
