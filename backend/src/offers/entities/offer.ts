import { UserEntity } from 'src/users/entities/user';
import { WishEntity } from 'src/wishes/entities/wish';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ foreignKeyConstraintName: 'FK_offers_to_users' })
  user: UserEntity;

  @ManyToOne(() => WishEntity, (wish) => wish.offers, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ foreignKeyConstraintName: 'FK_offers_to_wishes' })
  item: WishEntity;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  amount: number;

  @Column({ default: () => 'false' })
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
