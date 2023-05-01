import { UserPublicProfileResponseDto } from 'src/users/dto/userPublicProfileResponseDto';
import { WishPartialDto } from 'src/wishes/dto/wishPartialDto';
import { WishlistEntity } from '../entities/wishlist';

export class WishlistDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  image: string;

  owner: UserPublicProfileResponseDto;
  items: WishPartialDto[];

  constructor(wishList: WishlistEntity) {
    this.id = wishList.id;
    this.createdAt = wishList.createdAt.toISOString();
    this.updatedAt = wishList.updatedAt.toISOString();
    this.name = wishList.name;
    this.image = wishList.image;

    this.owner = new UserPublicProfileResponseDto(wishList.owner);
    this.items = wishList.items.map((item) => new WishPartialDto(item));
  }
}
