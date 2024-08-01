import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@src/modules/users/schemas/user.schema';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Access token' })
  @ApiBadRequestResponse({})
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return await this.authService.login(req.user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: User })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
