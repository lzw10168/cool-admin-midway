import { CoolController, BaseController } from '@cool-midway/core';
import { Body, Get, Inject, Query } from '@midwayjs/core';
import { RestaurantEntity } from '../../../restaurant/entity/info';
import { TableEntity } from '../../entity/info';
import { TableService } from '../../service/info';

/**
 * 商店管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: TableEntity,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
    select: ['a.*', 'b.title AS restaurantTitle'],
    // 4.x新增
    join: [
      {
        entity: RestaurantEntity,
        alias: 'b',
        condition: 'a.restaurantId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AdminRestaurantController extends BaseController {
  @Inject()
  tableService: TableService;
  @Get('/getCanAddTable', { summary: '获取可添加桌位' })
  async getCanAddTable(@Query('restaurantId') restaurantId: string) {
    return this.ok(await this.tableService.getCanAddTable(restaurantId));
  }
  // 查询桌位状态,接收日期,时间段,以及餐厅id,返回桌位状态
  @Get('/getTablesStatus', { summary: '获取桌位状态' })
  async getTablesStatus(
    @Query('restaurantId') restaurantId: string,
    @Query('date') date: string,
    @Query('time') time: string
    // enum: {
    //   1: '17:00',
    //   2: '17:30',
    //   3: '18:00',
    //   4: '18:30',
    //   5: '19:00',
    //   6: '19:30',
    //   7: '20:00',
    //   8: '20:30',
    // },
  ) {
    return this.ok(
      await this.tableService.getTablesStatus(restaurantId, date, time)
    );
  }
}
