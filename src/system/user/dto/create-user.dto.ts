import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * 账号
   * @example 'admin'
   */
  @IsString()
  @MinLength(4)
  account: string;

  /**
   * 密码
   * @example '123456'
   */
  @IsString()
  @MinLength(4)
  password: string;

  /**
   * 昵称
   * @example '管理员'
   */
  @IsString()
  @IsOptional()
  nickname?: string;

  /**
   * 邮箱
   * @example 'xxx@qq.com'
   */
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * 手机号
   * @example '18888888888'
   */
  @IsPhoneNumber('CN')
  @IsOptional()
  phoneNumber?: string;

  /**
   * 性别 0: 女 1: 男
   * @example 1
   */
  @IsEnum([0, 1])
  @IsOptional()
  sex?: number;

  /**
   * 状态 0: 禁用 1: 启用
   * @example 1
   */
  @IsEnum([0, 1])
  @IsOptional()
  status?: number = 1;

  /**
   * 头像
   * @example 'http://xxx.com/xxx.jpg'
   */
  @IsString()
  @IsOptional()
  avatar?: string;

  /**
   * 备注
   * @example '备注'
   */
  @IsString()
  @IsOptional()
  remark?: string;

  /**
   * 部门ID
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  deptId?: number;

  /**
   * 角色
   * @example [1, 2, 3]
   */
  @IsNumber({}, { each: true, message: '角色必须是数字' })
  roles?: number[] = [];
}
