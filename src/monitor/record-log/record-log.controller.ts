import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecordLogService } from './record-log.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RecordLog } from './entities/record-log.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryRecordLogDto } from './dto/query-record-log.dto';

@ApiTags('操作日志管理')
@ApiBearerAuth('bearer')
@Controller('record-log')
export class RecordLogController {
  constructor(private readonly recordLogService: RecordLogService) {}

  @Get()
  @ApiOperation({ summary: '获取日志列表' })
  @ApiOkResponse({ type: RecordLog, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryRecordLogDto: QueryRecordLogDto,
  ) {
    return this.recordLogService.findAll(paginationQueryDto, queryRecordLogDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recordLogService.findOne(id);
  }
}
