import { UserEntity } from '../entities/user';

export class UserProfileResponseDto {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.username = user.username;
    this.about = user.about;
    this.avatar = user.avatar;
    this.email = user.email;
    this.createdAt = user.updatedAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
  }
}
