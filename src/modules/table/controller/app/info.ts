import { TableService } from '../../service/info';
import { TableEntity } from '../../entity/info';
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
  entity: TableEntity,
  service: TableService,
})
export class AppTableController extends BaseController {
  @InjectEntityModel(TableEntity)
  TableEntity: Repository<TableEntity>;

  @Inject()
  TableService: TableService;

  @Post('/sqlPage', { summary: 'sql分页查询' })
  async sqlPage(@Body() query) {
    return this.ok(await this.TableService.sqlPage(query));
  }

  @Post('/entityPage', { summary: 'entity分页查询' })
  async entityPage(@Body() query) {
    return this.ok(await this.TableService.entityPage(query));
  }
}
