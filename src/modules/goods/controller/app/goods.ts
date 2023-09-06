import { GoodsService } from '../../service/goods';
import { GoodsEntity } from '../../entity/goods';
import { Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { CoolController, BaseController } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

/**
 * 测试
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: GoodsEntity,
  service: GoodsService,
})
export class AppDemoGoodsController extends BaseController {
  @InjectEntityModel(GoodsEntity)
  goodsEntity: Repository<GoodsEntity>;

  @Inject()
  goodsService: GoodsService;

  @Post('/sqlPage', { summary: 'sql分页查询' })
  async sqlPage(@Body() query) {
    return this.ok(await this.goodsService.sqlPage(query));
  }

  @Post('/entityPage', { summary: 'entity分页查询' })
  async entityPage(@Body() query) {
    return this.ok(await this.goodsService.entityPage(query));
  }
}
