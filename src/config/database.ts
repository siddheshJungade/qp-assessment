import { DataSource } from 'typeorm';
import { GroceryItem } from '../entities/GroceryItem';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/local.sqlite',
  entities: [GroceryItem],
  synchronize: process.env.NODE_ENV == 'production',
  logging: true
}); 