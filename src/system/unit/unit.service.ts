import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUnitDto } from './dto/query-unit.dto';

@Injectable()
export class UnitService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUnitDto: CreateUnitDto) {
    return this.prisma.unit.create({ data: createUnitDto });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryUnitDto: QueryUnitDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, value, beginTime, endTime } = queryUnitDto;
    const where = {
      name: { contains: name },
      value: { contains: value },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
      }),
      this.prisma.unit.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.unit.findUnique({ where: { id } });
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
  }

  remove(id: number) {
    return this.prisma.unit.delete({ where: { id } });
  }
}
