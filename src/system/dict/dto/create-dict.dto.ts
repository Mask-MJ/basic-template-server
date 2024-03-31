import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateDictDto {
  /**
   * 字典名称
   * @example '性别'
   */
  @IsString()
  @MinLength(1)
  name: string;

  /**
   * 字典值
   * @example '1'
   */
  @IsString()
  @MinLength(1)
  value: string;

  @IsNumber({}, { each: true })
  dictData?: number[] = [];

  /**
   * 备注
   * @example '备注'
   */
  remark?: string;
}
