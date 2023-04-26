import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
