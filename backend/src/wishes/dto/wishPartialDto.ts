import { WishEntity } from '../entities/wish';

export class WishPartialDto {
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

  constructor(item: WishEntity) {
    this.id = item.id;
    this.createdAt = item.updatedAt.toISOString();
    this.updatedAt = item.updatedAt.toISOString();
    this.name = item.name;
    this.link = item.link;
    this.image = item.image;
    this.price = item.price;
    this.raised = item.raised;
    this.copied = item.copied;
    this.description = item.description;
  }
}
