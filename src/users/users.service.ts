import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import UsersEntity from './users.entity';
import { UserDto } from './dto';
import { RETURN_MESSAGES } from 'src/ultilities/constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
    const currentUser = await this.usersRepository.findOne({ where: { id } });
    if (currentUser) {
      return currentUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(user: UserDto.Create) {
    try {
      const newUser = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new ConflictException(error.message);
      throw error;
    }
  }

  async updateUser(id: number, user: UserDto.Update) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.find({ where: { id } });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    const deleteUserResponse = await this.usersRepository.delete(id);
    if (!deleteUserResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { message: RETURN_MESSAGES.delete };
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) return user;
    throw new HttpException(
      'No user found with provided email',
      HttpStatus.NOT_FOUND,
    );
  }
}
