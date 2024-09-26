import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nestjs_db',
  entities: [User, Product],
  synchronize: true, // Set to false in production and use migrations
};
