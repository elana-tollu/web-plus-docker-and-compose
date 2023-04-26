import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistEntity } from './entities/wishlist';
import { ForbiddenException } from 'src/errors';
import { UpdateWishlist } from './updateWishlist';
import { NewWishlist } from './newWishlist';

@Injectable()
export class WishlistlistsService {
  constructor(
    @InjectRepository(WishlistEntity)
    private wishlistRepository: Repository<WishlistEntity>,
  ) {}

  async getAll() {
    const allWishlists = await this.wishlistRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        items: {
          owner: true,
        },
        owner: true,
      },
    });

    return allWishlists;
  }

  async addWishlist(newWishlist: NewWishlist, userId: number): Promise<void> {
    const wishlist = this.wishlistRepository.create({
      name: newWishlist.name,
      image: newWishlist.image,
      items: newWishlist.itemsId.map((id) => ({ id })),
      owner: {
        id: userId,
      },
    });

    await this.wishlistRepository.save(wishlist);
  }

  async getWishlist(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: {
        items: {
          owner: true,
        },
        owner: true,
      },
    });

    if (!wishlist) {
      throw new NotFoundException();
    }

    return wishlist;
  }

  async updateWishlist(
    userId: number,
    wishlistId: number,
    update: UpdateWishlist,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: {
        items: {
          owner: true,
        },
        owner: true,
      },
    });

    if (!wishlist) {
      throw new NotFoundException();
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException();
    }

    if (update.name) {
      wishlist.name = update.name;
    }
    if (update.image) {
      wishlist.image = update.image;
    }
    if (update.itemsId) {
      await this.wishlistRepository
        .createQueryBuilder()
        .relation('items')
        .of(wishlistId)
        .addAndRemove(update.itemsId, wishlist.items);
    }
    await this.wishlistRepository.save(wishlist);

    return wishlist;
  }

  async deleteWishlist(userId: number, wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: wishlistId,
      },
      relations: {
        items: {
          owner: true,
        },
        owner: true,
      },
    });

    if (!wishlist) {
      throw new NotFoundException();
    }

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException();
    }

    await this.wishlistRepository
      .createQueryBuilder()
      .relation('items')
      .of(wishlistId)
      .remove(wishlist.items);

    await this.wishlistRepository.delete(wishlistId);

    return wishlist;
  }
}

export interface UserPublicProfile {
  id: number;
  username: string;
  about: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
