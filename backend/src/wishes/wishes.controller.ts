import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateWishDto } from './dto/createWishDto';
import { UpdateWishDto } from './dto/updateWishDto';
import { WishDto } from './dto/WishDto';
import { ShallowWishDto } from './dto/shallowWishDto';
import { WishesService } from './wishes.service';
import { UserId } from 'src/userId.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createWish(
    @UserId() userId: number,
    @Body() newWish: CreateWishDto,
  ): Promise<object> {
    await this.wishesService.addWish(newWish, userId);
    return {};
  }

  @Get('last')
  async getLatestWishes(): Promise<WishDto[]> {
    const wishes = await this.wishesService.getLastWish();
    return wishes.map((wish) => new WishDto(wish));
  }

  @Get('top')
  async getTopWishes(): Promise<WishDto[]> {
    const wishes = await this.wishesService.getTopWish();
    return wishes.map((wish) => new WishDto(wish));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getWishById(@Param('id', ParseIntPipe) id: number): Promise<WishDto> {
    const wish = await this.wishesService.getWishById(id);
    return new WishDto(wish);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateWish(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWish: UpdateWishDto,
  ): Promise<ShallowWishDto> {
    const wish = await this.wishesService.updateWish(userId, id, updateWish);
    return new ShallowWishDto(wish);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteWishById(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WishDto> {
    const deleteWish = await this.wishesService.deleteWish(userId, id);
    return new WishDto(deleteWish);
  }

  @Post(':id/copy')
  @UseGuards(JwtAuthGuard)
  async copyWish(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, never>> {
    await this.wishesService.copyWish(id, userId);
    return {};
  }
}
