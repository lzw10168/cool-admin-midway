import { CoolController, BaseController } from '@cool-midway/core';
import { RestaurantEntity } from '../../entity/info';

/**
 * 商店管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: RestaurantEntity,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
  },
})
export class AdminRestaurantController extends BaseController {}
