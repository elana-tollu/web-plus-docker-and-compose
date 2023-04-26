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
import { CreateWishlistDto } from './dto/createWishlistDto';
import { UpdateWishlistDto } from './dto/updateWishlistDto';
import { WishlistDto } from './dto/wishlistDto';
import { WishlistlistsService } from './wishlistlists.service';
import { UserId } from 'src/userId.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('wishlistlists')
export class WishlistlistsController {
  constructor(private readonly wishlistlistsService: WishlistlistsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async wishlistLists(): Promise<WishlistDto[]> {
    const wishlists = await this.wishlistlistsService.getAll();
    return wishlists.map((wishlist) => new WishlistDto(wishlist));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async postWishlist(@Body() newWishlistDto: CreateWishlistDto): Promise<void> {
    const userId = 1; // todo взять из токена
    await this.wishlistlistsService.addWishlist(newWishlistDto, userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getWishlistId(@Param('id') stringId: string): Promise<WishlistDto> {
    const id = parseInt(stringId, 10);
    const wishlist = await this.wishlistlistsService.getWishlist(id);
    return new WishlistDto(wishlist);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateWishlistId(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() wishlist: UpdateWishlistDto,
  ): Promise<WishlistDto> {
    const updateWishlist = await this.wishlistlistsService.updateWishlist(
      userId,
      id,
      wishlist,
    );
    return new WishlistDto(updateWishlist);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteWishlistId(
    @UserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WishlistDto> {
    const wishlist = await this.wishlistlistsService.deleteWishlist(userId, id);
    return new WishlistDto(wishlist);
  }
}
