import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Permissions } from 'src/iam/authorization/decorators/permissions.decorator';

@ApiTags('用户管理')
@ApiBearerAuth('bearer')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Permissions('system:user:create')
  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Permissions('read:system:user')
  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({ type: User, isArray: true })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
    @Query() queryUserDto: QueryUserDto,
  ) {
    return this.userService.findAll(paginationQueryDto, queryUserDto);
  }

  @Get('info')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiOkResponse({ type: User })
  async findSelf(@ActiveUser() user: ActiveUserData) {
    return this.userService.findSelf(user.sub);
  }

  @Patch('changePassword')
  @ApiOperation({ summary: '修改密码' })
  @ApiOkResponse({ type: User })
  async changePassword(
    @Body() { id, oldPassword, password }: ChangePasswordDto,
  ) {
    return this.userService.changePassword(id, password, oldPassword);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiOkResponse({ type: User })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse({ type: User })
  remove(@ActiveUser() user: ActiveUserData, @Param('id') id: number) {
    return this.userService.remove(user, id);
  }

  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @ActiveUser() user: ActiveUserData,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: /image\/(png|jpg|jpeg)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(user, file);
  }
}
