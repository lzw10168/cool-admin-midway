import { CoolController, BaseController } from '@cool-midway/core';
import { ReservationsEntity } from '../../entity/info';

/**
 * 商店管理
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ReservationsEntity,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
  },
})
export class AdminRestaurantController extends BaseController {}
