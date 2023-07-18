import UsersEntity from 'src/users/users.entity';
import { Request } from '@nestjs/common';

export namespace AuthDto {
  export interface AuthLogin extends Request {
    user: UsersEntity;
  }

  export interface TokenPayload {
    userId: number;
  }
}
