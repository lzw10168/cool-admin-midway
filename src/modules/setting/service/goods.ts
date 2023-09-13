import { SettingEntity } from '../entity/setting';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 商品示例
 */
@Provide()
export class SettingService extends BaseService {
  @InjectEntityModel(SettingEntity)
  settingEntity: Repository<SettingEntity>;

  /**
   * 执行sql分页
   */
  async sqlPage(query) {
    return this.sqlRenderPage(
      'select * from goods ORDER BY id ASC',
      query,
      false
    );
  }

  /**
   * 执行entity分页
   */
  async entityPage(query) {
    const find = this.settingEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }
}
