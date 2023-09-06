import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

/**
 * 餐厅信息表
 */

@Entity('reservations_info')
export class ReservationsEntity extends BaseEntity {
  @Index()
  @Column({ comment: 'UserID', nullable: true })
  userId: string;

  @Column({ comment: 'RestaurantID', nullable: true })
  restaurantId: string;

  @Column({ comment: 'TableID', nullable: true })
  tableId: string;

  @Column({ comment: 'ReservationDate', nullable: true })
  reservationDate: string;

  @Column({ comment: 'ReservationTime', nullable: true })
  reservationTime: string;

  @Column({ comment: 'NumberOfGuests', nullable: true })
  numberOfGuests: number;

  // ['已预订', '已完成', '已取消']
  @Column({ comment: '状态 0-已预订 1-已完成 2-已取消', default: 1 })
  status: number;
}
