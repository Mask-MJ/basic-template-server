import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateValveDto {
  /**
   * 阀门名称
   * @example 'FV-3001B'
   */
  @IsString()
  @MinLength(1)
  name: string;

  /**
   * 阀门品牌
   * @example 'Fisher'
   */
  @IsString()
  brand?: string = '';

  /**
   * 阀门型号
   * @example 'E7'
   */
  @IsString()
  model?: string = '';

  /**
   * 阀门序列号
   * @example '20213971'
   */
  @IsString()
  serial?: string = '';

  /**
   * 阀门口径
   * @example '6x4"'
   */
  @IsString()
  caliber?: string = '';

  /**
   * 阀门磅级
   * @example '300RF'
   */
  @IsString()
  level?: string = '';

  /**
   * 阀体材质
   * @example 'WCC'
   */
  @IsString()
  material?: string = '';

  /**
   * 泄露等级
   * @example 'IV'
   */
  @IsString()
  leak?: string = '';

  /**
   * 执行机构型号
   * @example '667/45'
   */
  @IsString()
  actuator?: string = '';

  /**
   * 定位器型号
   * @example 'DVC6010/HC'
   */
  @IsString()
  locator?: string = '';

  /**
   * 阀门故障位
   * @example 'FC'
   */
  @IsString()
  fault?: string = '';

  /**
   * 阀门状态 0: 关闭 1: 开启
   * @example 1
   */
  @IsNumber()
  status?: number = 1;

  /**
   * 阀门描述
   * @example '这是一个阀门'
   */
  @IsString()
  remark?: string = '';

  /**
   * 装置id
   * @example 1
   */
  @IsNumber()
  deviceId?: number;

  /**
   * 工厂id
   * @example 1
   */
  @IsNumber()
  factoryId: number;
}
