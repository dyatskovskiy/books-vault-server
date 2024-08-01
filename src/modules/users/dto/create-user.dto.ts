import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: 'Please provide your name' })
  @Length(2, 50)
  @ApiProperty({ description: 'Username' })
  name: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    minLength: 8,
    maxLength: 64,
  })
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
