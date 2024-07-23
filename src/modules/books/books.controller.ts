import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createBookDto: CreateBookDto,
  ): Promise<Book> {
    const book = await this.booksService.create(createBookDto);
    return book;
  }

  @Get()
  async getAll() {
    const books = await this.booksService.getAll();

    return { total: books.length, books };
  }

  @Get(':id')
  async getOneById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    const book = await this.booksService.getOneById(id);

    return book;
  }

  @Delete(':id')
  async delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    await this.booksService.delete(id);
  }

  @Patch(':id/completed')
  async toggleCompleted(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    await this.booksService.toggleCompleted(id);
  }

  @Patch(':id')
  async update(
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    const updatedBook = await this.booksService.updateBook(id, updateBookDto);

    return updatedBook;
  }
}
