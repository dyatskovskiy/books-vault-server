import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in-dto';
import { PasswordService } from '../password/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, pass }: SignInDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    const isPasswordValid = await this.passwordService.validatePassword(
      pass,
      user.password,
    );

    if (user && isPasswordValid) return user;

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
