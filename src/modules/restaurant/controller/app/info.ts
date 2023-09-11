import { RestaurantService } from '../../service/info';
import { RestaurantEntity } from '../../entity/info';
import { Body, Get, Inject, Post, Provide, Query } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 测试
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: RestaurantEntity,
  service: RestaurantService,
})
export class AppRestaurantController extends BaseController {
  @InjectEntityModel(RestaurantEntity)
  restaurantEntity: Repository<RestaurantEntity>;

  @Inject()
  restaurantService: RestaurantService;

  @Post('/sqlPage', { summary: 'sql分页查询' })
  async sqlPage(@Body() query) {
    return this.ok(await this.restaurantService.sqlPage(query));
  }

  @Post('/entityPage', { summary: 'entity分页查询' })
  async entityPage(@Body() query) {
    return this.ok(await this.restaurantService.entityPage(query));
  }
  @Get('/getRestaurantMenu', { summary: '获取商店菜单' })
  async getRestaurantMenu(@Query('restaurantId') restaurantId: string) {
    return this.ok(
      await this.restaurantService.getRestaurantMenu(restaurantId)
    );
  }
  
}
