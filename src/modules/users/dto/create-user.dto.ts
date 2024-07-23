import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Please provide your name' })
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 64)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
