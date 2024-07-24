import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return user;
  }

  @Get()
  async getAll() {
    const users = await this.userService.getAll();

    return { total: users.length, users };
  }
}
