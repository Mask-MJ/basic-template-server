import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PrismaService } from 'nestjs-prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDeviceDto } from './dto/query-device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}
  create(user: ActiveUserData, createDeviceDto: CreateDeviceDto) {
    return this.prisma.device.create({
      data: {
        ...createDeviceDto,
        createrId: user.sub,
        valves: {
          connect: createDeviceDto.valves?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll(
    user: ActiveUserData,
    paginationQueryDto: PaginationQueryDto,
    queryDeviceDto: QueryDeviceDto,
  ) {
    const { page, pageSize } = paginationQueryDto;
    const { name, factoryId, status } = queryDeviceDto;
    const where = {
      name: { contains: name },
      factoryId,
      status,
    };
    const [data, total] = await Promise.all([
      this.prisma.device.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where,
        include: { factory: true },
      }),
      this.prisma.device.count({ where }),
    ]);
    return { data, total, page, pageSize };
  }

  findOne(id: number) {
    return this.prisma.device.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({
      where: { id },
      data: {
        ...updateDeviceDto,
        valves: {
          connect: updateDeviceDto.valves?.map((id) => ({ id })),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.device.delete({ where: { id } });
  }
}
