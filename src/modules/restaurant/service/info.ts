import { RestaurantEntity } from '../entity/info';
import { Inject, Provide } from '@midwayjs/decorator';
import { BaseService, CoolCommException } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from '../../table/entity/info';
import { GoodsEntity } from '../../goods/entity/goods';

/**
 * 商品示例
 */
@Provide()
export class RestaurantService extends BaseService {
  @Inject()
  ctx;

  @InjectEntityModel(RestaurantEntity)
  restaurantEntity: Repository<RestaurantEntity>;

  @InjectEntityModel(TableEntity)
  tableEntity: Repository<TableEntity>;

  @InjectEntityModel(GoodsEntity)
  goodsEntity: Repository<GoodsEntity>;

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
    const find = this.restaurantEntity.createQueryBuilder();
    return this.entityRenderPage(find, query);
  }

  async add(data) {
    const { title, table } = data;
    const that = this;
    // title unique
    let result = await this.restaurantEntity.findOneBy({ title });
    if (result) {
      throw new CoolCommException('title already exists');
    }
    result = await this.restaurantEntity.save(data);
    if (table) {
      const restaurantId = result.id;
      const tableList = table.split(',');
      tableList.forEach(async id => {
        // update table restaurantId
        const tableResult = await that.tableEntity.findOneBy({ id: id });
        if (tableResult) {
          tableResult.restaurantId = restaurantId + '';
          await that.tableEntity.save(tableResult);
        }
      });
    }
    return result;
  }

  async update(data: any) {
    const { title, table, id } = data;
    const that = this;
    // title unique
    let result = await this.restaurantEntity.findOne({
      where: { title },
    });
    if (result && result.id !== id) {
      throw new CoolCommException('title already exists');
    }
    data.updateTime = new Date();

    if (table) {
      const restaurantId = id;
      const tableList = table.split(',');
      tableList.forEach(async id => {
        // update table restaurantId
        const tableResult = await that.tableEntity.findOneBy({ id: id });
        if (tableResult) {
          tableResult.restaurantId = restaurantId + '';
          await that.tableEntity.save(tableResult);
        }
      });
    }
    return await this.restaurantEntity.update({ id }, data);
  }

  async getRestaurantMenu(restaurantId) {
    const result = await this.restaurantEntity.findOne({
      where: { id: restaurantId },
    });
    if (!result) {
      throw new CoolCommException('restaurant not found');
    }
    const menuList = result.menu.split(',');

    let goodslist = await this.goodsEntity.find();
    let goodsList =
      goodslist.filter(row => menuList.includes(row.id + '')) || [];
    return goodsList;
  }
}
