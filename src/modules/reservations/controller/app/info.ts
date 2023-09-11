import { ReservationsService } from '../../service/info';
import { ReservationsEntity } from '../../entity/info';
import { Body, Get, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../../../restaurant/entity/info';
import { UserInfoEntity } from '../../../user/entity/info';
import { TableEntity } from '../../../table/entity/info';

/**
 * 测试
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ReservationsEntity,
  service: ReservationsService,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
    fieldEq: [{
      column: 'a.status',
      requestParam: 'status',
    }, {
      column: 'a.restaurantId',
      requestParam: 'restaurantId',
    }, {
      column: 'a.userId',
      requestParam: 'userId',
    }],
    select: [
      'a.*',
      'b.title AS restaurantTitle',
      'b.mainImage AS restaurantMainImage',
      'c.email AS userEmail',
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
export class AppTableController extends BaseController {
  @InjectEntityModel(ReservationsEntity)
  ReservationsEntity: Repository<ReservationsEntity>;

  @Inject()
  ReservationsService: ReservationsService;

  @Post('/sqlPage', { summary: 'sql分页查询' })
  async sqlPage(@Body() query) {
    return this.ok(await this.ReservationsService.sqlPage(query));
  }

  @Post('/entityPage', { summary: 'entity分页查询' })
  async entityPage(@Body() query) {
    return this.ok(await this.ReservationsService.entityPage(query));
  }

  @Get('/getInfoDetail', { summary: '获取订单详情' })
  async getInfoDetail(@Query('id') id: string) {
    return this.ok(await this.ReservationsService.getInfoDetail(id));
  }
}
