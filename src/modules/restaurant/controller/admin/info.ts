import { CoolController, BaseController } from '@cool-midway/core';
import { RestaurantEntity } from '../../entity/info';
import { RestaurantService } from '../../service/info';
import { Body, Get, Inject, Post } from '@midwayjs/core';

/**
 * 商店管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: RestaurantEntity,
  service: RestaurantService,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
  },
})
export class AdminRestaurantController extends BaseController {
  @Inject()
  restaurantService: RestaurantService;
}
