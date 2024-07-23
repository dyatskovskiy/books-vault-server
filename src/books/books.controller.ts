import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/create-book.schema';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    const book = await this.booksService.create(createBookDto);
    return book;
  }
}
