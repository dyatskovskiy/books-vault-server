import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject() private readonly passwordService: PasswordService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkedUserInDb = await this.findUserByEmail(createUserDto.email);

    if (checkedUserInDb) throw new ConflictException('Email exists');

    const hash = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user = await this.userModel.create({
      ...createUserDto,
      password: hash,
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User> | undefined {
    const user = await this.userModel.findOne({ email: email }).exec();

    return user;
  }

  async getAll(): Promise<User[]> {
    const users = this.userModel.find().exec();

    return users;
  }
}
