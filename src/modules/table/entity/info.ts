import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * 餐厅信息表
 */
@Entity('table_info')
export class TableEntity extends BaseEntity {
  @Index()
  @Column({ comment: 'Title', length: 50 })
  title: string;

  @Column({ comment: 'Desc', nullable: true })
  description: string;

  // capacity
  @Column({ comment: 'Capacity', default: 4 })
  capacity: number;

  // restaurant id
  @Column({
    comment: 'Restaurant id',
    nullable: true,
  })
  restaurantId: string;
}
