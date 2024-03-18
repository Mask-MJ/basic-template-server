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
import { DictDataService } from './dict-data.service';
import { CreateDictDataDto } from './dto/create-dict-data.dto';
import { UpdateDictDataDto } from './dto/update-dict-data.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { DictData } from './entities/dict-data.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDictDataDto } from './dto/query-dict-data.dto';

@ApiTags('字典数据管理')
@ApiBearerAuth('bearer')
@Controller('dict-data')
export class DictDataController {
  constructor(private readonly dictDataService: DictDataService) {}

  @Post()
  @ApiOperation({ summary: '创建字典数据' })
  @ApiCreatedResponse({ type: DictData })
  create(@Body() createDictDataDto: CreateDictDataDto) {
    return this.dictDataService.create(createDictDataDto);
  }

  @Get()
  @ApiOperation({ summary: '获取字典数据列表' })
  @ApiOkResponse({ type: DictData, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryDictDataDto: QueryDictDataDto,
  ) {
    return this.dictDataService.findAll(paginationQueryDto, queryDictDataDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取字典数据详情' })
  @ApiOkResponse({ type: DictData })
  findOne(@Param('id') id: number) {
    return this.dictDataService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新字典数据' })
  @ApiOkResponse({ type: DictData })
  update(
    @Param('id') id: number,
    @Body() updateDictDataDto: UpdateDictDataDto,
  ) {
    return this.dictDataService.update(id, updateDictDataDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除字典数据' })
  remove(@Param('id') id: string) {
    return this.dictDataService.remove(+id);
  }
}
