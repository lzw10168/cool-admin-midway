import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';
import { TableEntity } from '../../table/entity/info';
/**
 * 餐厅信息表
 */
@Entity('restaurant_info')
export class RestaurantEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: 'Title', length: 50, unique: true })
  title: string;

  @Column({ comment: 'Desc', nullable: true })
  description: string;

  @Column({ comment: 'Main picture', nullable: true })
  mainImage: string;

  @Column({ comment: 'Sample graph', nullable: true, type: 'longtext' })
  exampleImages: string;

  // 开放时间 周日, 周六, 周五, 周四, 周三, 周二, 周一
  @Column({ comment: 'Open day', nullable: true })
  openDay: string;

  // 开放时间 17:00, 17:30, 18:00, 18:30, 19:00, 19:30, 20:00, 20:30
  @Column({
    comment: 'Open time',
    nullable: true,
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
  })
  openTime: string;
  // location
  @Column({ comment: 'Location', nullable: true })
  location: string;

  // 经纬度
  @Column({ comment: 'Longitude', nullable: true })
  longitude: string;

  @Column({ comment: 'Latitude', nullable: true })
  latitude: string;

  // 电话
  @Column({ comment: 'Phone', nullable: true })
  phone: string;

  // 人均消费
  @Column({ comment: 'Average price', nullable: true })
  averagePrice: number;

  // 评分 最高5分
  @Column({ comment: 'Score', nullable: true, default: 5 })
  score: number;

  // 营业状态 0-休息 1-营业中
  @Column({ comment: 'Status 0-休息 1-正常', default: 1 })
  status: number;

  // 关联goods表, 存储商品id
  @Column({ comment: 'Menu', nullable: true })
  menu: string;

  // 关联餐桌表, 存储餐桌id
  @Column({ comment: 'Table', nullable: true })
  table: string;
}
