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
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { Device } from './entities/device.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDeviceDto } from './dto/query-device.dto';

@ApiTags('装置管理')
@ApiBearerAuth('bearer')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: '创建装置' })
  @ApiCreatedResponse({ type: Device })
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.deviceService.create(user, createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: '获取装置列表' })
  @ApiOkResponse({ type: Device, isArray: true })
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryDeviceDto: QueryDeviceDto,
  ) {
    return this.deviceService.findAll(user, paginationQueryDto, queryDeviceDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取装置信息' })
  @ApiOkResponse({ type: Device })
  findOne(@Param('id') id: number) {
    return this.deviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新装置' })
  @ApiOkResponse({ type: Device })
  update(@Param('id') id: number, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除装置' })
  remove(@Param('id') id: number) {
    return this.deviceService.remove(id);
  }
}
