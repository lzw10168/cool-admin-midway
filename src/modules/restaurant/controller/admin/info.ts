import { CoolController, BaseController } from '@cool-midway/core';
import { RestaurantEntity } from '../../entity/info';
import { RestaurantService } from '../../service/info';
import { Body, Get, Inject, Post, Query } from '@midwayjs/core';

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

  @Get('/getRestaurantMenu', { summary: '获取商店菜单' })
  async getRestaurantMenu(@Query('restaurantId') restaurantId: string) {
    return this.ok(
      await this.restaurantService.getRestaurantMenu(restaurantId)
    );
  }
}
