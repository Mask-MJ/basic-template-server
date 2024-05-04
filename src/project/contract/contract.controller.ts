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
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Contract } from './entities/contract.entity';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryContractDto } from './dto/query-contract.dto';

@ApiTags('合同管理')
@ApiBearerAuth('bearer')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({ summary: '创建合同' })
  @ApiCreatedResponse({ type: Contract })
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createContractDto: CreateContractDto,
  ) {
    return this.contractService.create(user, createContractDto);
  }

  @Get()
  @ApiOperation({ summary: '获取合同列表' })
  @ApiOkResponse({ type: Contract, isArray: true })
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryContractDto: QueryContractDto,
  ) {
    return this.contractService.findAll(
      user,
      paginationQueryDto,
      queryContractDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '获取合同信息' })
  @ApiOkResponse({ type: Contract })
  findOne(@Param('id') id: number) {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新合同信息' })
  @ApiOkResponse({ type: Contract })
  update(
    @Param('id') id: number,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除合同' })
  remove(@Param('id') id: number) {
    return this.contractService.remove(id);
  }
}
