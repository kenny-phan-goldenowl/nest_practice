import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersEntity from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  // In NestJS, if you want to use a service from one module in another module,
  //you need to make sure that the service is exported from the module where it is defined and
  //imported into the module where it is required.
  exports: [UsersService], // Since we're using userService in AuthSerivce, we need to import it here first
})
export class UsersModule {}
