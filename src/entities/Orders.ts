import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Generated } from 'typeorm';
import { OrderItem } from './OrderItem';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    orderDate!: Date;

    @Column()
    customerId!: number;

    @Column()
    totalAmount!: number;

    @Column({
        type: 'text',
        default: OrderStatus.PENDING
    })
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

