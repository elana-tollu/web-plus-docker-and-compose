import { IsNotEmpty, IsNumber, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @Length(2, 45)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  description: string;
}
