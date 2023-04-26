import { OfferEntity } from 'src/offers/entities/offer';
import { WishEntity } from 'src/wishes/entities/wish';
import { WishlistEntity } from 'src/wishlistlists/entities/wishlist';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique('UQ_EMAIL', ['email'])
@Unique('UQ_USERNAME', ['username'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.owner)
  wishlists: WishlistEntity[];

  @OneToMany(() => WishEntity, (wish) => wish.owner)
  wishes: WishEntity[];

  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: WishEntity[];
}
