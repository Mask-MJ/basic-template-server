import { Controller, Get, Param, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Log } from './entities/log.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryLogDto } from './dto/query-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @ApiOperation({ summary: '获取日志列表' })
  @ApiResponse({ type: Log, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryLogDto: QueryLogDto,
  ) {
    return this.logService.findAll(paginationQueryDto, queryLogDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取日志信息' })
  @ApiResponse({ type: Log })
  findOne(@Param('id') id: number) {
    return this.logService.findOne(id);
  }
}
