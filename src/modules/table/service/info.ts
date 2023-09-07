import { TableEntity } from '../entity/info';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 商品示例
 */
@Provide()
export class TableService extends BaseService {
  @InjectEntityModel(TableEntity)
  TableEntity: Repository<TableEntity>;

  /**
   * 执行sql分页
   */
  async sqlPage(query) {
    return this.sqlRenderPage(
      'select * from restaurant-info ORDER BY id ASC',
      query,
      false
    );
  }

  /**
   * 执行entity分页
   */
  async entityPage(query) {
    const find = this.TableEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }

  async getCanChoseTable(restaurantId = null) {
    // 返回包含restaurantId, 或者restaurantId为空的桌位
    const data = await this.TableEntity.find();
    const list = data.filter(
      row => row.restaurantId === restaurantId || !row.restaurantId
    );
    return { list };
  }
}
