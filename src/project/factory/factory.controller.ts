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
import { FactoryService } from './factory.service';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Factory } from './entities/factory.entity';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryFactoryDto } from './dto/query-factory.dto';

@ApiTags('工厂管理')
@ApiBearerAuth('bearer')
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post()
  @ApiOperation({ summary: '创建工厂' })
  @ApiCreatedResponse({ type: Factory })
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createFactoryDto: CreateFactoryDto,
  ) {
    return this.factoryService.create(user, createFactoryDto);
  }

  @Get()
  @ApiOperation({ summary: '获取工厂列表' })
  @ApiOkResponse({ type: Factory, isArray: true })
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryFactoryDto: QueryFactoryDto,
  ) {
    return this.factoryService.findAll(
      user,
      paginationQueryDto,
      queryFactoryDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.factoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoryService.update(id, updateFactoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.factoryService.remove(id);
  }
}
