import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShallowWishDto } from 'src/wishes/dto/shallowWishDto';
import { FindUsersDto } from './dto/findUsersDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserProfileResponseDto } from './dto/userProfileResponseDto';
import { UserPublicProfileResponseDto } from './dto/userPublicProfileResponseDto';
import { UsersService } from './users.service';
import { AuthJwtService } from 'src/jwt/authJwt.service';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { UserId } from 'src/userId.decorator';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() userId: number): Promise<UserProfileResponseDto> {
    const user = await this.usersService.getById(userId);
    return new UserProfileResponseDto(user);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @UserId() userId: number,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const updatedMe = await this.usersService.updateUser(userId, updateUser);
    return new UserProfileResponseDto(updatedMe);
  }

  @Get('me/wishes')
  @UseGuards(JwtAuthGuard)
  async getMyWishes(@UserId() userId: number): Promise<ShallowWishDto[]> {
    const wishes = await this.usersService.getMyWishes(userId);
    return wishes.map((wish) => new ShallowWishDto(wish));
  }

  @Post('find')
  @UseGuards(JwtAuthGuard)
  async findUser(
    @Body() query: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    const foundUsers = await this.usersService.findUsers(query.query);
    return foundUsers.map((user) => new UserProfileResponseDto(user));
  }

  @Get(':username/wishes')
  @UseGuards(JwtAuthGuard)
  async getUserWishes(
    @Param('username') username: string,
  ): Promise<ShallowWishDto[]> {
    const userWishes = await this.usersService.getUserWishes(username);
    return userWishes.map((wish) => new ShallowWishDto(wish));
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Param('username') username: string,
  ): Promise<UserPublicProfileResponseDto> {
    const user = await this.usersService.getUser(username);
    return new UserPublicProfileResponseDto(user);
  }
}
