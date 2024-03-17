import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDeptDto {
  /**
   * 部门名称
   * @example '技术部'
   */
  @IsString()
  @MinLength(2)
  name: string;

  /**
   * 状态 0: 禁用 1: 启用
   * @example 1
   */
  @IsEnum([0, 1])
  @IsOptional()
  status?: number = 1;

  /**
   * 排序
   * @example 1
   */
  sort?: number = 1;

  /**
   * 上级部门ID
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  parentId?: number;

  /**
   * 备注
   * @example '备注'
   */
  @IsString()
  @IsOptional()
  remark?: string;
}
