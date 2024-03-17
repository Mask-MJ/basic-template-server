import { Injectable } from '@nestjs/common';
import { CreateRecordLogDto } from './dto/create-record-log.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryRecordLogDto } from './dto/query-record-log.dto';

@Injectable()
export class RecordLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRecordLogDto: CreateRecordLogDto) {
    return this.prisma.recordLog.create({
      data: createRecordLogDto,
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryRecordLogDto: QueryRecordLogDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { account, action, module, beginTime, endTime } = queryRecordLogDto;
    const where = {
      account: { contains: account },
      action: { contains: action },
      module: { contains: module },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.recordLog.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
      }),
      this.prisma.recordLog.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.recordLog.findUniqueOrThrow({ where: { id } });
  }
}
