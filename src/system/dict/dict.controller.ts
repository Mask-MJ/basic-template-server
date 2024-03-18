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
import { DictService } from './dict.service';
import { CreateDictDto } from './dto/create-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDictDto } from './dto/query-dict.dto';
import { Dict } from './entities/dict.entity';

@ApiTags('字典管理')
@ApiBearerAuth('bearer')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  @Post()
  @ApiOperation({ summary: '创建字典' })
  @ApiCreatedResponse({ type: Dict })
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get()
  @ApiOperation({ summary: '获取字典列表' })
  @ApiOkResponse({ type: Dict, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryDictDto: QueryDictDto,
  ) {
    return this.dictService.findAll(paginationQueryDto, queryDictDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取字典详情' })
  @ApiOkResponse({ type: Dict })
  findOne(@Param('id') id: number) {
    return this.dictService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新字典' })
  @ApiOkResponse({ type: Dict })
  update(@Param('id') id: number, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(id, updateDictDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除字典' })
  remove(@Param('id') id: number) {
    return this.dictService.remove(id);
  }
}
