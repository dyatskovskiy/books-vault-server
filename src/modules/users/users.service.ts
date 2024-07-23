import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkedUserInDb = await this.checkEmailExists(createUserDto.email);

    if (checkedUserInDb) throw new ConflictException('Email exists');

    const user = await this.userModel.create(createUserDto);

    return user;
  }

  async checkEmailExists(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }
}
