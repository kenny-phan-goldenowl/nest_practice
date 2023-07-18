import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto';
import { AuthDto } from './dto';
import { AuthenticateGuard } from './auth.guard';
import { Response } from 'express';
import JwtAuthGuard from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() request: AuthDto.AuthLogin) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  async register(@Body() registerInfo: UserDto.Create) {
    return this.authService.register(registerInfo);
  }

  @HttpCode(200)
  @UseGuards(AuthenticateGuard)
  @Post('login')
  async login(@Body() request: AuthDto.AuthLogin, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
