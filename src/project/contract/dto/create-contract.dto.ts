import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import * as dayjs from 'dayjs';
export class CreateContractDto {
  /**
   * 合同名称
   * @example '合同1'
   */
  @IsString()
  @MinLength(1)
  name: string;

  /**
   * 签订合同时间
   * @example 1714880210196
   */
  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  contractTime: Date;

  /**
   * 采购阀门总数
   * @example 1000
   */
  @IsNumber()
  valveCount: number;

  /**
   * 高级阀门数量
   * @example 1000
   */
  @IsNumber()
  highValveCount: number;

  /**
   * 客户名称
   * @example '客户1'
   */
  @IsString()
  customer: string;

  /**
   * 客户联系方式
   * @example '123456789'
   */
  @IsString()
  customerPhone: string;

  /**
   * 销售人员
   * @example '销售1'
   */
  @IsString()
  saler: string;

  /**
   * 项目备注
   * @example '备注1'
   */
  @IsString()
  remark?: string = '';

  /**
   * 工厂id
   * @example 1
   */
  @IsNumber()
  factoryId: number;
}
