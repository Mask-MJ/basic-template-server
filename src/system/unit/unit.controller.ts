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
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Unit } from './entities/unit.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUnitDto } from './dto/query-unit.dto';

// 本质上字典, 又要多写一遍
@ApiTags('数据单位管理')
@ApiBearerAuth('bearer')
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({ summary: '创建单位' })
  @ApiCreatedResponse({ type: Unit })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: '获取单位列表' })
  @ApiOkResponse({ type: Unit, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryUnitDto: QueryUnitDto,
  ) {
    return this.unitService.findAll(paginationQueryDto, queryUnitDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单位详情' })
  @ApiOkResponse({ type: Unit })
  findOne(@Param('id') id: number) {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新单位' })
  @ApiOkResponse({ type: Unit })
  update(@Param('id') id: number, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.unitService.remove(id);
  }
}
