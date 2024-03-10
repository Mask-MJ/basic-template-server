import { Controller, Get, Param, Delete } from '@nestjs/common';
import { OnlineService } from './online.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('在线用户管理')
@ApiBearerAuth('bearer')
@Controller('online')
export class OnlineController {
  constructor(private readonly onlineService: OnlineService) {}

  @Get()
  @ApiOperation({ summary: '获取在线用户列表' })
  findAll() {
    return this.onlineService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: '移除在线用户' })
  remove(@Param('id') id: number) {
    return this.onlineService.remove(id);
  }
}
