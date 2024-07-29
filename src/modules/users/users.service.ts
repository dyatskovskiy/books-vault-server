import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '../password/password.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkedUserInDb = await this.findUserByEmail(createUserDto.email);

    if (checkedUserInDb) throw new ConflictException('Email exists');

    const hash = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const verificationToken = uuidv4();

    const user = await this.userModel.create({
      ...createUserDto,
      password: hash,
      verificationToken,
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User> | undefined {
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password')
      .exec();

    return user;
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.userModel.findOne({ verificationToken: token });

    if (!user || user.verified === true)
      throw new BadRequestException('Verification failure');

    user.verified = true;
    user.verificationToken = '';

    user.save();
  }

  async sendVerificationEmail(user: User): Promise<void> {
    const messageConfig = this.mailService.configureMessage(
      user.email,
      'Email verification',
      `<b>Please, click link below to verify your email</b>
      <a href="http://localhost:${process.env.PORT}/verify/${user.verificationToken}">Verify</a>`,
    );

    await this.mailService
      .sendEmail(messageConfig)
      .then((result) => {
        console.log('Send email result:', result);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }
}
