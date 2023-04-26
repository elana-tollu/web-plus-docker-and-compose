import {
  Body,
  Controller,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/createUserDto';
import { SigninUserResponseDto } from 'src/users/dto/signinUserResponseDto';
import { UserDto } from 'src/users/dto/userDto';
import { UserAlreadyExistsExceptionFilter } from '../filters/alreadyExists.filter';
import { AuthService } from './auth.service';
import { IncorrectLoginExceptionFilter } from '../filters/incorrectLogin.filter';
import { Response } from 'express';
import { AuthJwtService } from 'src/jwt/authJwt.service';
import { setAuthJwtCookie } from 'src/jwt/cookieUtils';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from 'src/userId.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @Post('signup')
  @UseFilters(UserAlreadyExistsExceptionFilter)
  async signUp(@Body() newUser: CreateUserDto): Promise<UserDto> {
    const user = await this.authService.signUp(newUser);
    return new UserDto(user);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  @UseFilters(IncorrectLoginExceptionFilter)
  async signIn(
    @UserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninUserResponseDto> {
    const jwt = this.authJwtService.makeToken(userId);
    setAuthJwtCookie(jwt, res);
    return new SigninUserResponseDto(jwt);
  }
}
