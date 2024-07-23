import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Please provide the title' })
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'Please provide the author' })
  @IsNotEmpty()
  author: string;

  @IsString({ message: 'Please provide the description' })
  @IsNotEmpty()
  description: string;
}
