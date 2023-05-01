import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
  private readonly logger = new Logger(AuthJwtService.name);

  constructor(private readonly jwtService: JwtService) {}

  makeToken(userId: number): string {
    const payload = { sub: userId };
    const expiration = { expiresIn: '1h' };

    return this.jwtService.sign(payload, expiration);
  }
}
