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
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Dept } from './entities/dept.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryDeptDto } from './dto/query-dept.dto';

@ApiTags('部门管理')
@ApiBearerAuth('bearer')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post()
  @ApiOperation({ summary: '创建部门' })
  @ApiCreatedResponse({ type: Dept })
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @Get()
  @ApiOperation({ summary: '获取部门列表' })
  @ApiOkResponse({ type: Dept, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryDeptDto: QueryDeptDto,
  ) {
    return this.deptService.findAll(paginationQueryDto, queryDeptDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取部门详情' })
  @ApiOkResponse({ type: Dept })
  findOne(@Param('id') id: number) {
    return this.deptService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新部门' })
  @ApiOkResponse({ type: Dept })
  update(@Param('id') id: number, @Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(id, updateDeptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除部门' })
  @ApiOkResponse({ type: Dept })
  remove(@Param('id') id: number) {
    return this.deptService.remove(id);
  }
}
