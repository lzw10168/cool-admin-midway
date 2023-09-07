import { CoolController, BaseController } from '@cool-midway/core';
import { Body, Get, Inject, Query } from '@midwayjs/core';
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
  },
})
export class AdminRestaurantController extends BaseController {
  @Inject()
  tableService: TableService;
  @Get('/getCanChoseTable', { summary: '获取可选桌位' })
  async getCanChoseTable(@Query('restaurantId') restaurantId: string) {
    return this.ok(await this.tableService.getCanChoseTable(restaurantId));
  }
}
