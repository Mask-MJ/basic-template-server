import { IsString, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  /**
   * 权限名称
   * @example '创建用户'
   */
  @IsString()
  name: string;

  /**
   * 权限关键字
   * @example 'system:user:create'
   */
  @IsString()
  value: string;

  /**
   * 权限描述
   * @example '这是一个权限'
   */
  @IsString()
  remark?: string = '';

  /**
   * 角色id
   * @example [1, 2, 3]
   */
  @IsNumber({}, { each: true, message: '角色id必须是数字' })
  roles?: number[] = [];
}
