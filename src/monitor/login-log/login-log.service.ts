import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import IP2Region from 'ip2region';
import { CreateLoginLogDto } from './dto/create-login-log.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryLoginLogDto } from './dto/query-login-log.dto';

@Injectable()
export class LoginLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLoginLogDto: CreateLoginLogDto) {
    const query = new IP2Region();
    const addressInfo = query.search(createLoginLogDto.ip);
    const address = addressInfo ? addressInfo.province + addressInfo.city : '';
    return this.prisma.loginLog.create({
      data: { ...createLoginLogDto, address },
    });
  }

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryLoginLogDto: QueryLoginLogDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { account, address, beginTime, endTime } = queryLoginLogDto;
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
