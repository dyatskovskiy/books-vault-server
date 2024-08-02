import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, user): Promise<Book> {
    const createdBook = await this.bookModel.create({
      owner: user.userId,
      ...createBookDto,
    });

    return createdBook;
  }

  async getAll(user): Promise<Book[]> {
    const books = await this.bookModel.find({ owner: user.userId }).exec();

    return books;
  }

  async getOneById(id: mongoose.Schema.Types.ObjectId): Promise<Book> {
    const result = await this.bookModel.findById(id).exec();

    if (!result) throw new NotFoundException(`Book with ID ${id} not found`);

    return result;
  }

  async getCompleted(user): Promise<Book[]> {
    const books = await this.bookModel
      .find({ owner: user.userId, isCompleted: true })
      .exec();

    return books;
  }

  async delete(id: mongoose.Schema.Types.ObjectId): Promise<void> {
    const result = await this.bookModel.findByIdAndDelete(id);

    if (!result) throw new NotFoundException(`Book with ID ${id} not found`);
  }

  async toggleCompleted(id: mongoose.Schema.Types.ObjectId): Promise<Book> {
    const book = await this.getOneById(id);

    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    const result = await this.bookModel.findByIdAndUpdate(
      id,
      {
        isCompleted: !book.isCompleted,
      },
      { new: true },
    );

    if (!result) throw new BadRequestException('Something went wrong');

    return result;
  }

  async updateBook(
    id: mongoose.Schema.Types.ObjectId,
    dataToUpdate: Partial<Book>,
  ): Promise<Book> {
    const book = await this.getOneById(id);

    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);

    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      {
        ...dataToUpdate,
      },
      { new: true },
    );

    return updatedBook;
  }
}
