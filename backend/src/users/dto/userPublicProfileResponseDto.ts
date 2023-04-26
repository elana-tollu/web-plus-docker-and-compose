import { UserEntity } from '../entities/user';

export class UserPublicProfileResponseDto {
  id: number;
  username: string;
  about: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.about = user.about;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
  }
}
