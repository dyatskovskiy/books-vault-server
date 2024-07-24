import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
