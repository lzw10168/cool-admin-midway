import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * 餐厅信息表
 */

@Entity('reservations_info')
export class ReservationsEntity extends BaseEntity {
  @Index()
  @Column({ comment: 'UserID', nullable: true })
  userId: number;

  @Column({ comment: 'RestaurantID', nullable: true })
  restaurantId: number;

  @Column({ comment: 'TableID', nullable: true })
  tableId: number;

  @Column({ comment: 'ReservationDate', nullable: true })
  reservationDate: string;

  @Column({ comment: 'ReservationTime', nullable: true })
  reservationTime: string;
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
  // menu, goodsId
  @Column({ comment: 'Menu', nullable: true })
  menu: string;

  @Column({ comment: 'NumberOfGuests', nullable: true })
  numberOfGuests: number;

  // remark
  @Column({ comment: 'Remark', nullable: true })
  remark: string;

  // ['已预订', '已完成', '已取消']
  @Column({ comment: '状态 1-已预订 2-已完成 -1-已取消', default: 1 })
  status: number;
}
