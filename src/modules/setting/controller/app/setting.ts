import { SettingService } from '../../service/goods';
import { SettingEntity } from '../../entity/setting';
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
  entity: SettingEntity,
  service: SettingService,
})
export class AppDemoGoodsController extends BaseController {
  @InjectEntityModel(SettingEntity)
  SettingEntity: Repository<SettingEntity>;

  @Inject()
  SettingService: SettingService;

  @Post('/sqlPage', { summary: 'sql分页查询' })
  async sqlPage(@Body() query) {
    return this.ok(await this.SettingService.sqlPage(query));
  }

  @Post('/entityPage', { summary: 'entity分页查询' })
  async entityPage(@Body() query) {
    return this.ok(await this.SettingService.entityPage(query));
  }
}
