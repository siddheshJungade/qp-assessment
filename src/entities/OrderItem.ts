import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from './Orders';
import { GroceryItem } from './GroceryItem';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    // Foreign key column for Orders
    @Column()
    orderId!: number;

    // Foreign key column for GroceryItem
    @Column()
    groceryItemId!: number;

    @Column()
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice!: number;

    @Column('decimal', { precision: 12, scale: 2 })
    subtotal!: number;

    @ManyToOne(() => GroceryItem)
    @JoinColumn({ name: 'groceryItemId' })
    groceryItem!: GroceryItem;

    @ManyToOne(() => Orders)
    @JoinColumn({ name: 'orderId' })
    order!: Orders;
} 