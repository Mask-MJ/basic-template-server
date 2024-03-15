import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryLogDto } from './dto/query-log.dto';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(paginationQueryDto: PaginationQueryDto, queryLogDto: QueryLogDto) {
    const { page, pageSize } = paginationQueryDto;
    const { account, address, beginTime, endTime } = queryLogDto;

    return this.prisma.loginLog.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where: {
        account: { contains: account },
        address: { contains: address },
        createdAt: { gte: beginTime, lte: endTime },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.loginLog.findUniqueOrThrow({ where: { id } });
  }
}
