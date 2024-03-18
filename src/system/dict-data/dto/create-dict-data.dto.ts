export class CreateDictDataDto {
  /**
   * 字典ID
   * @example 1
   */
  dictId: number;
  /**
   * 字典数据名称
   * @example '性别'
   */
  name: string;

  /**
   * 字典数据值
   * @example '1'
   */
  value: string;

  /**
   * 排序
   * @example 1
   */
  sort?: number;

  /**
   * 备注
   * @example '备注'
   */
  remark?: string;
}
