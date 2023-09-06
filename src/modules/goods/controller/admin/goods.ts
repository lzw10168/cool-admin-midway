import { CoolController, BaseController } from '@cool-midway/core';
import { GoodsEntity } from '../../entity/goods';

/**
 * 商品模块-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsEntity,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
  },
})
export class AdminGoodsController extends BaseController {}
