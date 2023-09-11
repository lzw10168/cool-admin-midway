import { ReservationsEntity } from '../entity/info';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '../../table/entity/info';
import { RestaurantEntity } from '../../restaurant/entity/info';
import { GoodsEntity } from '../../goods/entity/goods';

/**
 * 商品示例
 */
@Provide()
export class ReservationsService extends BaseService {
  @InjectEntityModel(ReservationsEntity)
  ReservationsEntity: Repository<ReservationsEntity>;
  @InjectEntityModel(TableEntity)
  TableEntity: Repository<TableEntity>;
  @InjectEntityModel(RestaurantEntity)
  RestaurantEntity: Repository<RestaurantEntity>;
  @InjectEntityModel(GoodsEntity)
  GoodsEntity: Repository<GoodsEntity>;

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

  async getInfoDetail(id) {
    // 通过id拿到订单详情, 且通过restaurantId拿到餐厅详情, tableId拿到桌位详情, menu拿到菜单详情
    const data = await this.ReservationsEntity.find({
      where: {
        id,
      },
    });
    const { restaurantId, tableId, menu } = data[0];
    const restaurantInfo  = await this.RestaurantEntity.find({
      where: {
        id: restaurantId,
      },
    });
    const tableInfo = await this.TableEntity.find({
      where: {
        id: tableId,
      },
    });
    const menuList = menu && menu.split(',') || [];
    let goodslist = await this.GoodsEntity.find();
    let goodsList =
      goodslist.filter(row => menuList.includes(row.id + '')) || [];
    return {
      ...data[0],
      restaurantInfo: restaurantInfo[0],
      tableInfo: tableInfo[0],
      goodsList: goodsList,
    };
  }
}
