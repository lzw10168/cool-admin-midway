import { ReservationsEntity } from '../entity/info';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 商品示例
 */
@Provide()
export class ReservationsService extends BaseService {
  @InjectEntityModel(ReservationsEntity)
  ReservationsEntity: Repository<ReservationsEntity>;

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
    const find = this.ReservationsEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }
}
