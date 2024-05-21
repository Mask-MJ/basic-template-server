import { PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import dayjs from 'dayjs';

export class CreateAnalysisTaskDto {
  /**
   * 任务名称
   * @example '分析任务1'
   */
  @IsString()
  name: string;
  /**
   * 状态 (0: 待执行, 1: 执行中, 2: 已完成, 3: 失败)
   * @example 1
   */
  @IsEnum([0, 1, 2, 3])
  @Transform(({ value }) => parseInt(value), { toClassOnly: true })
  status: number = 0;
  /**
   * pdf路径
   * @example ['path1', 'path2']
   */
  @IsString({ each: true })
  pdfPath: string[];
  /**
   * 数据字典ID
   * @example 1
   */
  @IsNumber()
  dictId: number;
  /**
   * 工厂ID
   * @example 1
   */
  @IsNumber()
  factoryId: number;
  /**
   * 备注
   * @example '备注'
   */
  @IsString()
  @IsOptional()
  remark?: string;
}

export class QueryAnalysisTaskDto {
  /**
   * 任务名称
   * @example '分析任务1'
   */
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  status?: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  beginTime?: Date;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => dayjs(value).format(), { toClassOnly: true })
  endTime?: Date;
}

export class ExecuteAnalysisTaskDto {
  /**
   * 任务ID
   * @example 1
   */
  @IsNumber()
  id: number;
  /**
   * 数据字典ID
   * @example 1
   */
  @IsNumber()
  dictId: number;
  /**
   * 工厂ID
   * @example 1
   */
  @IsNumber()
  factoryId: number;
  /**
   * pdf路径
   * @example ['path1', 'path2']
   */
  @IsString({ each: true })
  pdfPath: string[];
}

export class UpdateAnalysisTaskDto extends PartialType(CreateAnalysisTaskDto) {}
