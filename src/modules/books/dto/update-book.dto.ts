import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Book } from '../schemas/book.schema';

export class UpdateBookDto extends OmitType(PartialType(Book), ['owner']) {}
