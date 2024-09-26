import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product],
  migrations: ['src/migrations/*.ts'],
});
