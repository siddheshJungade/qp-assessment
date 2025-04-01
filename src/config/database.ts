import { DataSource } from 'typeorm';
import { GroceryItem } from '../entities/GroceryItem';
import { Orders } from '../entities/Orders';
import { OrderItem } from '../entities/OrderItem';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/local.sqlite',
  entities: [GroceryItem, Orders, OrderItem],
  synchronize: process.env.NODE_ENV != 'production',
  logging: true
}); 
