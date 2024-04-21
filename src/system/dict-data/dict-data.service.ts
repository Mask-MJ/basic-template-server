import { Injectable } from '@nestjs/common';
import { CreateDictDataDto } from './dto/create-dict-data.dto';
import { UpdateDictDataDto } from './dto/update-dict-data.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDictDataDto } from './dto/query-dict-data.dto';

@Injectable()
export class DictDataService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDictDataDto: CreateDictDataDto) {
    return this.prisma.dictData.create({ data: createDictDataDto });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryDictDataDto: QueryDictDataDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, value, dictId, beginTime, endTime } = queryDictDataDto;
    const where = {
      dictId,
      name: { contains: name },
      value: { contains: value },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.dictData.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
      }),
      this.prisma.dictData.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.dictData.findUnique({ where: { id } });
  }

  update(id: number, updateDictDataDto: UpdateDictDataDto) {
    return this.prisma.dictData.update({
      where: { id },
      data: updateDictDataDto,
    });
  }

  remove(id: number) {
    return this.prisma.dictData.delete({ where: { id } });
  }
}
