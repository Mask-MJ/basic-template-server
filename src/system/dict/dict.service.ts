import { Injectable } from '@nestjs/common';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DictService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDictDto: CreateDictDto) {
    return this.prisma.dict.create({
      data: {
        ...createDictDto,
        dictData: {
          connect: createDictDto.dictData?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryDictDto: QueryDictDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, value, beginTime, endTime } = queryDictDto;
    const where = {
      name: { contains: name },
      value: { contains: value },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.dict.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
      }),
      this.prisma.dict.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.dict.findUnique({ where: { id } });
  }

  update(id: number, updateDictDto: UpdateDictDto) {
    return this.prisma.dict.update({
      where: { id },
      data: {
        ...updateDictDto,
        dictData: {
          connect: updateDictDto.dictData?.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.dict.delete({ where: { id } });
  }
}
