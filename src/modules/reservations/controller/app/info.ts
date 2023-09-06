import { ReservationsService } from '../../service/info';
import { ReservationsEntity } from '../../entity/info';
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
  entity: ReservationsEntity,
  service: ReservationsService,
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
}
