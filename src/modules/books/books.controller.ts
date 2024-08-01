import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface GetAllResponse {
  total: number;
  books: Book[];
}

@Controller('books')
@ApiTags('books')
@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, type: Book })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async create(
    @Body(new ValidationPipe()) createBookDto: CreateBookDto,
    @Request() req: ExpressRequest,
  ): Promise<Book> {
    const book = await this.booksService.create(createBookDto, req.user);

    return book;
  }

  @Get()
  @ApiOkResponse({ status: 200, type: [Book] })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async getAll(@Request() req: ExpressRequest): Promise<GetAllResponse> {
    const books = await this.booksService.getAll(req.user);

    return { total: books.length, books };
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Book })
  @ApiNotFoundResponse({ description: 'The book not found' })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async getOneById(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ): Promise<Book> {
    const book = await this.booksService.getOneById(id);

    return book;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id' })
  @ApiNoContentResponse({ description: 'Successfully deleted' })
  @ApiNotFoundResponse({ description: 'The book not found' })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async delete(@Param('id') id: mongoose.Schema.Types.ObjectId): Promise<void> {
    await this.booksService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id/completed')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, type: Book })
  @ApiNotFoundResponse({ description: 'The book not found' })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async toggleCompleted(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ): Promise<Book> {
    const updatedBook = await this.booksService.toggleCompleted(id);

    return updatedBook;
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, type: Book })
  @ApiNotFoundResponse({ description: 'The book not found' })
  @ApiForbiddenResponse({ description: 'Not authorized' })
  async update(
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ): Promise<Book> {
    const updatedBook = await this.booksService.updateBook(id, updateBookDto);

    return updatedBook;
  }
}
