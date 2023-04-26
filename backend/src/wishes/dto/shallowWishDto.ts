import { UserPublicProfileResponseDto } from 'src/users/dto/userPublicProfileResponseDto';
import { WishEntity } from '../entities/wish';

export class ShallowWishDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  link: string;
  image: string;
  price: number;
  raised: number;
  copied: number;
  description: string;
  owner: UserPublicProfileResponseDto;

  constructor(wish: WishEntity) {
    this.id = wish.id;
    this.createdAt = wish.createdAt.toISOString();
    this.updatedAt = wish.updatedAt.toISOString();
    this.name = wish.name;
    this.link = wish.link;
    this.image = wish.image;
    this.price = wish.price;
    this.raised = wish.raised;
    this.copied = wish.copied;
    this.description = wish.description;
    this.owner = new UserPublicProfileResponseDto(wish.owner);
  }
}
