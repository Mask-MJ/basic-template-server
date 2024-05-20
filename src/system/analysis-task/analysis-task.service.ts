import { Injectable } from '@nestjs/common';
import {
  CreateAnalysisTaskDto,
  ExecuteAnalysisTaskDto,
  QueryAnalysisTaskDto,
  UpdateAnalysisTaskDto,
} from './dto/analysis-task.dto';
import { PrismaService } from 'nestjs-prisma';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class AnalysisTaskService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: ActiveUserData, createAnalysisTaskDto: CreateAnalysisTaskDto) {
    return this.prisma.analysisTask.create({
      data: { ...createAnalysisTaskDto, createBy: user.account },
    });
  }

  findAll(
    paginationQueryDto: PaginationQueryDto,
    queryAnalysisTaskDto: QueryAnalysisTaskDto,
  ) {
    // return `This action returns all analysisTask`;
    const { page, pageSize } = paginationQueryDto;
    const { name, status, beginTime, endTime } = queryAnalysisTaskDto;
    const where = {
      name: { contains: name },
      status,
      createdAt: { gte: beginTime, lte: endTime },
    };
    return this.prisma.analysisTask.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
    });
  }

  findOne(id: number) {
    return this.prisma.analysisTask.findUnique({ where: { id } });
  }

  execute(
    user: ActiveUserData,
    executeAnalysisTaskDto: ExecuteAnalysisTaskDto,
  ) {
    console.log('executeAnalysisTaskDto', executeAnalysisTaskDto);
    return 'This action adds a new analysisTask';
  }

  update(
    id: number,
    user: ActiveUserData,
    updateAnalysisTaskDto: UpdateAnalysisTaskDto,
  ) {
    return this.prisma.analysisTask.update({
      where: { id },
      data: { ...updateAnalysisTaskDto, updateBy: user.account },
    });
  }

  remove(id: number) {
    return this.prisma.analysisTask.delete({ where: { id } });
  }
}
