import { WishEntity } from 'src/wishes/entities/wish';

export class UserWishesDto {
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
  }
}
