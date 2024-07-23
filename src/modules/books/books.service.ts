import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = await this.bookModel.create(createBookDto);

    return createdBook;
  }

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();

    return books;
  }

  async getOneById(id: mongoose.Schema.Types.ObjectId): Promise<Book> {
    const result = await this.bookModel.findById(id).exec();

    if (!result) throw new NotFoundException(`Book with ID ${id} not found`);

    return result;
  }

  async delete(id: mongoose.Schema.Types.ObjectId): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);

    if (!result) throw new NotFoundException(`Book with ID ${id} not found`);
  }

  async toggleCompleted(id: mongoose.Schema.Types.ObjectId): Promise<void> {
    const book = await this.getOneById(id);

    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    const result = await this.bookModel.findByIdAndUpdate(id, {
      isCompleted: !book.isCompleted,
    });

    if (!result) throw new BadRequestException('Something went wrong');
  }
}