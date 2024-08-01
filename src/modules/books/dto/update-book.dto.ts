import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Book } from '../schemas/book.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto extends OmitType(PartialType(Book), ['owner']) {
  @ApiPropertyOptional({
    description: 'The title of the book',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'The author of the book',
  })
  author: string;

  @ApiPropertyOptional({ description: 'The description of the book' })
  description: string;

  @ApiPropertyOptional({
    description: 'A flag indicating whether the book has been read',
  })
  isCompleted: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'The tags of the book. Could be empty',
  })
  tags: string[];

  @ApiPropertyOptional({ description: 'Link to image of the book' })
  imageUrl: string;
}
