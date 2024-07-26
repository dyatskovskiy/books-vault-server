import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in-dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn({ email, pass }: SignInDto) {
    const user = await this.usersService.findUserByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
