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
   * 菜单ID
   * @example 1
   */
  @IsNumber()
  menuId: number;
}
