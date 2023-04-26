import { ColumnDecimalTransformer } from 'src/decimal.transformer';
import { OfferEntity } from 'src/offers/entities/offer';
import { UserEntity } from 'src/users/entities/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wishes')
export class WishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column({
    type: 'decimal',
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  raised: number;

  @ManyToOne(() => UserEntity, (user) => user.wishes, { nullable: false })
  @JoinColumn({ foreignKeyConstraintName: 'FK_wishes_to_users' })
  owner: UserEntity;

  @Column()
  description: string;

  @OneToMany(() => OfferEntity, (offer) => offer.item, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  offers: OfferEntity[];

  @Column({
    type: 'int4',
  })
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
