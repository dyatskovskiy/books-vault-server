import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendEmailDto {
  @ApiProperty({ description: 'Email' })
  @IsEmail()
  email: string;
}
