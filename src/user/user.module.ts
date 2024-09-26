import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Using only the User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
