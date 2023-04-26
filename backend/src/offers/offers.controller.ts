import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateOfferDto } from './dto/createOfferDto';
import { OfferDto } from './dto/offerDto';
import { OffersService } from './offers.service';
import { UserId } from 'src/userId.decorator';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async postOffer(
    @UserId() userId: number,
    @Body() newOfferDto: CreateOfferDto,
  ): Promise<Record<string, unknown>> {
    await this.offersService.addOffer(userId, newOfferDto);

    return {};
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOffers(): Promise<OfferDto[]> {
    const offers = await this.offersService.getOffers();
    return offers.map((offer) => new OfferDto(offer));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOffersId(@Param('id') stringId: string): Promise<OfferDto> {
    const id = parseInt(stringId, 10);
    const offer = await this.offersService.getOffer(id);
    return new OfferDto(offer);
  }
}
