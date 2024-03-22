import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ValveService } from './valve.service';
import { CreateValveDto } from './dto/create-valve.dto';
import { UpdateValveDto } from './dto/update-valve.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { QueryValveDto } from './dto/query-valve.dto';
import { Valve } from './entities/valve.entity';

@ApiTags('阀门管理')
@ApiBearerAuth('bearer')
@Controller('valve')
export class ValveController {
  constructor(private readonly valveService: ValveService) {}

  @Post()
  @ApiOperation({ summary: '创建阀门' })
  @ApiCreatedResponse({ type: Valve })
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createValveDto: CreateValveDto,
  ) {
    return this.valveService.create(user, createValveDto);
  }

  @Get()
  @ApiOperation({ summary: '获取阀门列表' })
  @ApiOkResponse({ type: Valve, isArray: true })
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryValveDto: QueryValveDto,
  ) {
    return this.valveService.findAll(user, paginationQueryDto, queryValveDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取阀门信息' })
  @ApiOkResponse({ type: Valve })
  findOne(@Param('id') id: number) {
    return this.valveService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新阀门信息' })
  @ApiOkResponse({ type: Valve })
  update(@Param('id') id: number, @Body() updateValveDto: UpdateValveDto) {
    return this.valveService.update(id, updateValveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除阀门' })
  remove(@Param('id') id: number) {
    return this.valveService.remove(id);
  }
}
