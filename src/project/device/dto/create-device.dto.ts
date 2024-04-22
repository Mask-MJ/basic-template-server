import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateDeviceDto {
  /**
   * 装置名称
   * @example '装置1'
   */
  @IsString()
  @MinLength(1)
  name: string;

  /**
   * 装置状态 0: 关闭 1: 开启
   * @example 1
   */
  @IsNumber()
  status?: number = 1;

  /**
   * 装置描述
   * @example '这是一个装置'
   */
  @IsString()
  remark?: string = '';

  /**
   * 工厂id
   * @example 1
   */
  @IsNumber()
  factoryId: number;

  /**
   * 阀门ids
   * @example [1, 2, 3]
   */
  @IsNumber({}, { each: true })
  valves?: number[];
}
