import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishEntity } from 'src/wishes/entities/wish';
import { Like, Repository } from 'typeorm';
import { UserEntity } from './entities/user';
import { hashPassword } from 'src/auth/hashUtils';
import { UpdateUser } from './updateUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(WishEntity)
    private wishRepository: Repository<WishEntity>,
  ) {}

  async getById(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    return user;
  }

  async updateUser(userId: number, updateUser: UpdateUser) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (updateUser.username) {
      user.username = updateUser.username;
    }
    if (updateUser.about) {
      user.about = updateUser.about;
    }
    if (updateUser.avatar) {
      user.avatar = updateUser.avatar;
    }
    if (updateUser.email) {
      user.email = updateUser.email;
    }
    if (updateUser.password) {
      user.password = await hashPassword(updateUser.password);
    }
    await this.userRepository.save(user);

    return user;
  }

  async getMyWishes(userId: number) {
    const wishes = await this.wishRepository.find({
      where: {
        owner: { id: userId },
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    return wishes;
  }

  async getUser(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return user;
  }

  async getUserWishes(username: string) {
    const user = await this.userRepository.findOneBy([{ username }]);

    const wishes = await this.wishRepository.find({
      where: {
        owner: user,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    return wishes;
  }

  async findUsers(query: string) {
    const users = await this.userRepository.findBy([
      { username: Like(`%${query}%`) },
      { email: Like(`%${query}%`) },
    ]);

    return users;
  }
}
