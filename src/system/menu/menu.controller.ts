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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Menu } from './entities/menu.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUserDto } from './dto/query-menu.dto';

@ApiTags('菜单管理')
@ApiBearerAuth('bearer')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post()
  @ApiOperation({ summary: '创建菜单' })
  @ApiCreatedResponse({ type: Menu })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: '获取菜单列表' })
  @ApiOkResponse({ type: Menu, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryUserDto: QueryUserDto,
  ) {
    return this.menuService.findAll(paginationQueryDto, queryUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取菜单信息' })
  @ApiOkResponse({ type: Menu })
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新菜单信息' })
  @ApiOkResponse({ type: Menu })
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  @ApiOkResponse({ type: Menu })
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }
}
