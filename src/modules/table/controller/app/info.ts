import { TableService } from '../../service/info';
import { TableEntity } from '../../entity/info';
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
  // 查询桌位状态,接收日期,时间段,以及餐厅id,返回桌位状态
  @Get('/getTablesStatus', { summary: '获取桌位状态' })
  async getTablesStatus(
    @Query('restaurantId') restaurantId: string,
    @Query('date') date: string,
    @Query('time') time: string
    // enum: {
    //   1: '17:00',
    //   2: '17:30',
    //   3: '18:00',
    //   4: '18:30',
    //   5: '19:00',
    //   6: '19:30',
    //   7: '20:00',
    //   8: '20:30',
    // },
  ) {
    return this.ok(
      await this.TableService.getTablesStatus(restaurantId, date, time)
    );
  }
}
