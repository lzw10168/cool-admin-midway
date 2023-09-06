import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商品模块-商品信息
 */
@Entity('goods')
export class GoodsEntity extends BaseEntity {
  @Index()
  @Column({ comment: 'Title', length: 50 })
  title: string;

  @Column({
    comment: 'Price',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  price: number;

  @Column({ comment: 'Desc', nullable: true })
  description: string;

  @Column({ comment: 'Main picture', nullable: true })
  mainImage: string;

  @Column({ comment: 'Sample graph', nullable: true })
  exampleImages: string;

  @Column({ comment: 'Stock', default: 0 })
  stock: number;
  // 上架
  @Column({ comment: '状态 0-禁用 1-正常', default: 1 })
  status: number;
}
