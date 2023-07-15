import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { RETURN_MESSAGES } from 'src/ultilities/constant';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async register(userInfo: UserDto.Create) {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
      const newUser = await this.usersService.createUser({
        ...userInfo,
        password: hashedPassword,
      });
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueValidation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async verifyPassword(password: string, userPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, userPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        RETURN_MESSAGES.loginError,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async login(email: string, password: string) {
    try {
      const userInfo = await this.usersService.getUserByEmail(email);
      await this.verifyPassword(password, userInfo.password);
      userInfo.password = undefined;
      return userInfo;
    } catch (error) {
      throw new HttpException(
        RETURN_MESSAGES.loginError,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
