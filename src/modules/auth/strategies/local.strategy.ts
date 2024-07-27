import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'pass',
    });
  }

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.authService.validateUser({ email, pass });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
