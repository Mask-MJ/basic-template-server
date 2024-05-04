import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { PrismaService } from 'nestjs-prisma';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryContractDto } from './dto/query-contract.dto';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  create(user: ActiveUserData, createContractDto: CreateContractDto) {
    return this.prisma.contract.create({
      data: {
        ...createContractDto,
        createrId: user.sub,
      },
    });
  }

  async findAll(
    user: ActiveUserData,
    paginationQueryDto: PaginationQueryDto,
    queryContractDto: QueryContractDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, customer, saler, factoryId } = queryContractDto;
    const where = {
      name: { contains: name },
      customer: { contains: customer },
      saler: { contains: saler },
      factoryId,
    };
    const [data, total] = await Promise.all([
      this.prisma.contract.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { factory: true },
      }),
      this.prisma.contract.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.contract.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateContractDto: UpdateContractDto) {
    return this.prisma.contract.update({
      where: { id },
      data: updateContractDto,
    });
  }

  remove(id: number) {
    return this.prisma.contract.delete({ where: { id } });
  }
}
