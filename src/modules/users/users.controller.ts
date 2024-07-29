import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { ResendEmailDto } from './dto/resend-email.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @SkipAuth()
  @Post('users')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    await this.userService.sendVerificationEmail(user);

    return user;
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    await this.userService.verifyEmail(token);

    return { success: true };
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async resendEmail(@Body() resendEmailDto: ResendEmailDto) {
    const user = await this.userService.findUserByEmail(resendEmailDto.email);

    if (!user) throw new NotFoundException('User not found');

    if (user.verified === true)
      throw new BadRequestException('Verification has already been passed ');

    await this.userService.sendVerificationEmail(user);

    return { success: true };
  }
}
