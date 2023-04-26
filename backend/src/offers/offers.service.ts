import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from './entities/offer';
import { WishEntity } from 'src/wishes/entities/wish';
import { BusinessRuleViolationException } from 'src/errors';
import { NewOffer } from './newOffer';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepository: Repository<OfferEntity>,
    @InjectRepository(WishEntity)
    private wishRepository: Repository<WishEntity>,
  ) {}

  async addOffer(userId: number, newOffer: NewOffer): Promise<void> {
    const wish = await this.wishRepository.findOne({
      where: {
        id: newOffer.itemId,
      },
      relations: {
        owner: true,
      },
    });

    if (!wish) {
      throw new BusinessRuleViolationException('Wish does not exist');
    }

    if (wish.owner.id === userId) {
      throw new BusinessRuleViolationException(
        `Cannot contribute to one's own wish`,
      );
    }

    const amountToRaise = wish.price - wish.raised;

    if (amountToRaise < newOffer.amount) {
      throw new BusinessRuleViolationException(
        'Offer amount is more than required',
      );
    }

    const offer = this.offerRepository.create({
      amount: newOffer.amount,
      hidden: newOffer.hidden,
      item: {
        id: newOffer.itemId,
      },
      user: {
        id: userId,
      },
    });
    await this.offerRepository.save(offer);
    await this.wishRepository.update(newOffer.itemId, {
      raised: wish.raised + newOffer.amount,
    });
  }

  async getOffers() {
    const allOffers = await this.offerRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        item: {
          owner: true,
        },
        user: true,
      },
    });

    return allOffers;
  }

  async getOffer(offerId: number) {
    const offer = await this.offerRepository.findOne({
      where: {
        id: offerId,
      },
      relations: {
        item: {
          owner: true,
        },
        user: true,
      },
    });

    return offer;
  }
}
