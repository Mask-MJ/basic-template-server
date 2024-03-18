export class CreateDictDto {
  /**
   * 字典名称
   * @example '性别'
   */
  name: string;

  /**
   * 字典值
   * @example '1'
   */
  value: string;

  /**
   * 备注
   * @example '备注'
   */
  remark?: string;
}
