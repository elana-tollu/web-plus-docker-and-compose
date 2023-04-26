import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user';
import { QueryFailedError, Repository } from 'typeorm';
import { DatabaseError } from 'pg';
import { UserAlreadyExistsException, IncorrectLoginException } from '../errors';
import { checkPassword, hashPassword } from './hashUtils';
import { NewUser } from './newUser';
import { SignIn } from './signin';

const PG_UNIQUE_VIOLATION = '23505';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(newUser: NewUser): Promise<SignedUpUser> {
    const passwordHash = await hashPassword(newUser.password);

    const user = this.userRepository.create({
      username: newUser.username,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      const createdUser = await this.userRepository.save(user);

      return {
        id: createdUser.id,
        username: createdUser.username,
        about: createdUser.about,
        avatar: createdUser.avatar,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError instanceof DatabaseError &&
        error.driverError.code === PG_UNIQUE_VIOLATION
      ) {
        throw new UserAlreadyExistsException();
      } else {
        throw error;
      }
    }
  }

  async signIn(signIn: SignIn): Promise<number> {
    const user = await this.userRepository.findOneBy({
      username: signIn.username,
    });

    if (user === null) {
      this.logger.error('no user for', signIn.username);
      throw new IncorrectLoginException();
    }
    const isPasswordValid = await checkPassword(signIn.password, user.password);
    if (!isPasswordValid) {
      this.logger.error('invalid password', signIn.password);
      throw new IncorrectLoginException();
    }

    return user.id;
  }
}

export interface SignedUpUser {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessToken {
  access_token: string;
}
