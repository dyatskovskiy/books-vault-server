import { IsBoolean, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Please provide the title' })
  title: string;

  @IsString({ message: 'Please provide the author' })
  author: string;

  @IsBoolean()
  isCompleted: boolean;
}
