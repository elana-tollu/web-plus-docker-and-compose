import { ShallowWishDto } from 'src/wishes/dto/shallowWishDto';
import { UserDto } from 'src/users/dto/userDto';
import { OfferEntity } from '../entities/offer';

export class OfferDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: UserDto;
  item: ShallowWishDto;
  amount: number;
  name: string;

  constructor(offer: OfferEntity) {
    this.id = offer.id;
    this.createdAt = offer.createdAt.toISOString();
    this.updatedAt = offer.updatedAt.toISOString();
    this.user = new UserDto(offer.user);
    this.name = offer.user.username;
    this.item = new ShallowWishDto(offer.item);
    this.amount = offer.amount;
  }
}
