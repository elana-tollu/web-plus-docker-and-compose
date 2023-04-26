import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishEntity } from './entities/wish';
import { BusinessRuleViolationException } from 'src/errors';
import { NewWish } from './newWish';
import { UpdateWish } from './updateWish';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(WishEntity)
    private wishRepository: Repository<WishEntity>,
  ) {}

  async addWish(newWish: NewWish, userId: number): Promise<void> {
    const wish = this.wishRepository.create({
      name: newWish.name,
      link: newWish.link,
      image: newWish.image,
      price: newWish.price,
      raised: 0,
      copied: 0,
      description: newWish.description,
      owner: {
        id: userId,
      },
    });

    await this.wishRepository.save(wish);
  }

  async getLastWish() {
    const wishes = await this.wishRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        owner: true,
        offers: {
          item: {
            owner: true,
          },
          user: true,
        },
      },
      take: 40,
    });

    return wishes;
  }

  async getTopWish() {
    const wishes = await this.wishRepository.find({
      order: {
        copied: 'DESC',
      },
      relations: {
        owner: true,
        offers: {
          item: {
            owner: true,
          },
          user: true,
        },
      },
      take: 20,
    });

    return wishes;
  }

  async getWishById(wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: true,
        offers: {
          user: true,
          item: {
            owner: true,
          },
        },
      },
    });

    if (!wish) {
      throw new NotFoundException();
    }
    return wish;
  }

  async updateWish(userId: number, wishId: number, update: UpdateWish) {
    const wish = await this.wishRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (!wish) {
      throw new NotFoundException();
    }

    if (wish.owner.id !== userId) {
      throw new ForbiddenException();
    }

    if (update.name) {
      wish.name = update.name;
    }
    if (update.link) {
      wish.link = update.link;
    }
    if (update.image) {
      wish.image = update.image;
    }
    if (update.price) {
      if (wish.offers.length > 0) {
        throw new BusinessRuleViolationException(
          'Price change not allowed when there are already offers',
        );
      }
      wish.price = update.price;
    }
    if (update.description) {
      wish.description = update.description;
    }
    await this.wishRepository.save(wish);

    return wish;
  }

  async deleteWish(userId: number, wishId: number) {
    const wish = await this.wishRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (!wish) {
      throw new NotFoundException();
    }

    if (wish.owner.id !== userId) {
      throw new ForbiddenException();
    }

    wish.offers = [];
    await this.wishRepository.save(wish);

    await this.wishRepository.delete(wishId);

    return wish;
  }

  async copyWish(wishId: number, userId: number): Promise<void> {
    const originalWish = await this.wishRepository.findOneBy({
      id: wishId,
    });

    if (!originalWish) {
      throw new NotFoundException();
    }

    const newWish = this.wishRepository.create({
      name: originalWish.name,
      link: originalWish.link,
      image: originalWish.image,
      price: originalWish.price,
      raised: 0,
      copied: 0,
      description: originalWish.description,
      owner: {
        id: userId,
      },
    });

    await this.wishRepository.save(newWish);

    await this.wishRepository.update(wishId, {
      copied: originalWish.copied + 1,
    });
  }
}
