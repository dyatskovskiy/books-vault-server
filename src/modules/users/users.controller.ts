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
import { SkipAuth } from '@src/common/decorators/skip-auth.decorator';
import { ResendEmailDto } from './dto/resend-email.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@src/modules/users/schemas/user.schema';

@SkipAuth()
@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('users')
  @ApiResponse({ status: 201, type: User })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Email exists',
  })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    await this.userService.sendVerificationEmail(user);

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'token' })
  @ApiOkResponse({ description: 'Success' })
  @ApiBadRequestResponse({ description: 'Verification failure' })
  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    await this.userService.verifyEmail(token);

    return { success: true };
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResendEmailDto })
  @ApiOkResponse({ status: 200, description: 'Success' })
  @ApiNotFoundResponse({ status: 404, description: 'User not found' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Verification has already been passed ',
  })
  @Post('verify')
  async resendEmail(@Body() resendEmailDto: ResendEmailDto) {
    const user = await this.userService.findUserByEmail(resendEmailDto.email);

    if (!user) throw new NotFoundException('User not found');

    if (user.verified === true)
      throw new BadRequestException('Verification has already been passed');

    await this.userService.sendVerificationEmail(user);

    return { success: true };
  }
}
