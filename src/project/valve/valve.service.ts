import { Injectable } from '@nestjs/common';
import { CreateValveDto } from './dto/create-valve.dto';
import { UpdateValveDto } from './dto/update-valve.dto';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { QueryValveDto } from './dto/query-valve.dto';

@Injectable()
export class ValveService {
  constructor(private prisma: PrismaService) {}

  create(user: ActiveUserData, createValveDto: CreateValveDto) {
    return this.prisma.valve.create({ data: createValveDto });
  }

  async findAll(
    user: ActiveUserData,
    paginationQueryDto: PaginationQueryDto,
    queryValveDto: QueryValveDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, factoryId, status } = queryValveDto;

    const where = {
      name: { contains: name },
      factoryId,
      status,
    };
    const [data, total] = await Promise.all([
      this.prisma.valve.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { factory: true },
      }),
      this.prisma.valve.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.valve.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateValveDto: UpdateValveDto) {
    return this.prisma.valve.update({ where: { id }, data: updateValveDto });
  }

  remove(id: number) {
    return this.prisma.valve.delete({ where: { id } });
  }
}
