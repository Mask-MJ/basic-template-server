import { Inject, Injectable } from '@nestjs/common';
import { OnlineIdsStorage } from './online-ids.storage';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUserDto } from '../user/dto/query-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/iam/config/jwt.config';

@Injectable()
export class OnlineService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly onlineIdsStorage: OnlineIdsStorage,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async findAll(
    paginationQueryDto: PaginationQueryDto,
    queryUserDto: QueryUserDto,
  ) {
    const users = await this.onlineIdsStorage.findAll();
    const userIds = users.map((item) => Number(item.id));
    const { page, pageSize } = paginationQueryDto;
    const { account, nickname, status, beginTime, endTime } = queryUserDto;
    const where = {
      id: { in: userIds },
      account: { contains: account },
      nickname: { contains: nickname },
      status,
      createdAt: { gte: beginTime, lte: endTime },
    };
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { roles: true },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  async remove(id: number) {
    await this.jwtService.signAsync(
      { sub: id },
      { secret: this.jwtConfiguration.secret, expiresIn: 0 },
    );
    return this.onlineIdsStorage.remove(id);
  }
}
