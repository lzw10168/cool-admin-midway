import { CoolController, BaseController } from '@cool-midway/core';
import { SettingEntity } from '../../entity/setting';

/**
 * 商品模块-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: SettingEntity,
  pageQueryOp: {
    keyWordLikeFields: ['title', 'description'],
  },
})
export class AdminGoodsController extends BaseController {}
