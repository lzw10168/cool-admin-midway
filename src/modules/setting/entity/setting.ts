import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * 设置表
 */
@Entity('setting')
export class SettingEntity extends BaseEntity {
  @Index()
  @Column({ comment: 'silverLevel' })
  silver_level: number;

  @Column({ comment: 'goldenLevel' })
  golden_level: number;

  @Column({ comment: 'diamondLevel' })
  diamond_level: number;
}
