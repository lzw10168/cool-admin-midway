import { TableEntity } from '../entity/info';
import { Provide } from '@midwayjs/decorator';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationsEntity } from '../../reservations/entity/info';

/**
 * 商品示例
 */
@Provide()
export class TableService extends BaseService {
  @InjectEntityModel(TableEntity)
  TableEntity: Repository<TableEntity>;
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
    const find = this.TableEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }

  async getCanAddTable(restaurantId = null) {
    // 返回包含restaurantId, 或者restaurantId为空的桌位
    const data = await this.TableEntity.find();
    const list = data.filter(
      row => row.restaurantId === restaurantId || !row.restaurantId
    );
    return list;
  }
  async getTablesStatus(restaurantId, date, time) {
    if (!restaurantId || !date || !time) {
      return [];
    }
    //  首先拿到所有的桌位,通过restaurantId
    const allTable = await this.TableEntity.find({
      where: {
        restaurantId,
      },
    });
    // 通过restaurantId, date, time, 拿到所有的订单
    const allReservations = await this.ReservationsEntity.find({
      where: {
        restaurantId,
        reservationDate: date,
        reservationTime: time,
        status: 1, // 1: 已预订
      },
    });
    // 遍历allTable, 拿到每一个桌位的id, 然后遍历allReservations, 拿到每一个订单的tableId, 如果相等,
    // 添加disabled属性, 如果不相等, 添加disabled属性为false
    const list = allTable.map(row => {
      const tableId = row.id;
      const isHas = allReservations.some(row => +row.tableId == +tableId);
      if (isHas) {
        const orderInfo = allReservations.find(row => +row.tableId == +tableId);
        return { ...row, disabled: isHas, orderInfo };
      }
      return { ...row, disabled: false };
    });

    return list;
  }
}
