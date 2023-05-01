import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { WishlistlistsController } from './wishlistlists/wishlistlists.controller';
import { WishlistlistsService } from './wishlistlists/wishlistlists.service';
import { OffersController } from './offers/offers.controller';
import { OffersService } from './offers/offers.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { WishesService } from './wishes/wishes.service';
import { WishesController } from './wishes/wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user';
import { WishEntity } from './wishes/entities/wish';
import { WishlistEntity } from './wishlistlists/entities/wishlist';
import { OfferEntity } from './offers/entities/offer';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService, JWT_SECRET } from './jwt/authJwt.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT', 5432),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [UserEntity, WishEntity, WishlistEntity, OfferEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      WishEntity,
      WishlistEntity,
      OfferEntity,
    ]),
    JwtModule.register({ secret: JWT_SECRET }),
  ],
  controllers: [
    AppController,
    AuthController,
    WishlistlistsController,
    OffersController,
    UsersController,
    WishesController,
  ],
  providers: [
    AppService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    WishlistlistsService,
    OffersService,
    UsersService,
    WishesService,
    AuthJwtService,
  ],
})
export class AppModule {}
