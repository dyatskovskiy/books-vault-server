import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString({ message: 'Please provide the title' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the book',
    required: true,
  })
  title: string;

  @IsString({ message: 'Please provide the author' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The author of the book',
  })
  author: string;

  @IsString({ message: 'Please provide the description' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the book',
  })
  description: string;
}
