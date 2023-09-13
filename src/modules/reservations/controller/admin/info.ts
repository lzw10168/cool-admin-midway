import { CoolController, BaseController } from '@cool-midway/core';
import { Body, Inject, Post } from '@midwayjs/decorator';
import { RestaurantEntity } from '../../../restaurant/entity/info';
import { TableEntity } from '../../../table/entity/info';
import { UserInfoEntity } from '../../../user/entity/info';
import { ReservationsEntity } from '../../entity/info';
import { ReservationsService } from '../../service/info';

/**
 * 订单管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ReservationsEntity,
  service: ReservationsService,

  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
    fieldEq: [
      {
        column: 'a.status',
        requestParam: 'status',
      },
      {
        column: 'a.restaurantId',
        requestParam: 'restaurantId',
      },
      {
        column: 'a.userId',
        requestParam: 'userId',
      },
    ],
    select: [
      'a.*',
      'b.title AS restaurantTitle',
      'c.email AS userEmail',
      'c.phone AS userPhone',
      'c.nickName AS userNickName',
      'd.title AS tableTitle',
    ],

    // 4.x新增
    join: [
      {
        entity: RestaurantEntity,
        alias: 'b',
        condition: 'a.restaurantId = b.id',
        type: 'leftJoin',
      },
      {
        entity: UserInfoEntity,
        alias: 'c',
        condition: 'a.userId = c.id',
        type: 'leftJoin',
      },
      {
        entity: TableEntity,
        alias: 'd',
        condition: 'a.tableId = d.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AdminRestaurantController extends BaseController {
  @Inject()
  restaurantService: ReservationsService;

  @Post('/completeOrder', { summary: '完成订单' })
  async completeOrder(@Body('id') id: string) {
    return this.ok(await this.restaurantService.completeOrder(id));
  }
}
