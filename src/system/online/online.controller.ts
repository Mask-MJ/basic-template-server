import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { OnlineService } from './online.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUserDto } from '../user/dto/query-user.dto';

@ApiTags('在线用户管理')
@ApiBearerAuth('bearer')
@Controller('online')
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) {}

  @Get()
  @ApiOperation({ summary: '获取在线用户列表' })
  @ApiOkResponse({ type: User, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryUserDto: QueryUserDto,
  ) {
    return this.onlineService.findAll(paginationQueryDto, queryUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '移除在线用户' })
  remove(@Param('id') id: number) {
    return this.onlineService.remove(id);
  }
}
