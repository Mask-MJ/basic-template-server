import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  /**
   * 菜单名称
   * @example '系统管理'
   */
  @IsString()
  name: string;

  /**
   * 菜单路径
   * @example '/system'
   */
  @IsString()
  path: string;

  /**
   * 菜单图标
   * @example 'i-line-md:external-link'
   */
  @IsString()
  icon: string;

  /**
   * 是否隐藏
   * @example false
   */
  @IsBoolean()
  hidden?: boolean = false;

  /**
   * 菜单状态 0: 关闭 1: 开启
   * @example 1
   */
  @IsNumber()
  status?: number = 1;

  /**
   * 排序
   * @example 1
   */
  @IsNumber()
  sort?: number = 1;

  /**
   * 父级菜单id
   * @example 0
   */
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
