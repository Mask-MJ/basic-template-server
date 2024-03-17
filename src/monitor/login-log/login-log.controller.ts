import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoginLogService } from './login-log.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { LoginLog } from './entities/login-log.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryLoginLogDto } from './dto/query-login-log.dto';

@ApiTags('登录日志管理')
@ApiBearerAuth('bearer')
@Controller('login-log')
export class LoginLogController {
  constructor(private readonly loginLogService: LoginLogService) {}

  @Get()
  @ApiOperation({ summary: '获取日志列表' })
  @ApiOkResponse({ type: LoginLog, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryLoginLogDto: QueryLoginLogDto,
  ) {
    return this.loginLogService.findAll(paginationQueryDto, queryLoginLogDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取日志信息' })
  @ApiOkResponse({ type: LoginLog })
  findOne(@Param('id') id: number) {
    return this.loginLogService.findOne(id);
  }
}
