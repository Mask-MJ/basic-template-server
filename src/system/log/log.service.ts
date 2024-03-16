import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryLogDto } from './dto/query-log.dto';
import { CreateLogDto } from './dto/create-log.dto';
import IP2Region from 'ip2region';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto) {
    const query = new IP2Region();
    const addressInfo = query.search(createLogDto.ip);
    console.log(addressInfo);
    const address = addressInfo ? addressInfo.province + addressInfo.city : '';
    return this.prisma.loginLog.create({
      data: { ...createLogDto, address },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryLogDto: QueryLogDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { account, address, beginTime, endTime } = queryLogDto;
    const where = {
      account: { contains: account },
      address: { contains: address },
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.loginLog.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
      }),
      this.prisma.loginLog.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.loginLog.findUniqueOrThrow({ where: { id } });
  }
}
