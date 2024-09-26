import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4(); 

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
