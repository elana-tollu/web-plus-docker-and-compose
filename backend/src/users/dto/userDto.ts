import { SignedUpUser } from 'src/auth/auth.service';

export class UserDto {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: SignedUpUser) {
    this.id = user.id;
    this.username = user.username;
    this.about = user.about;
    this.avatar = user.avatar;
    this.email = user.email;
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
  }
}
