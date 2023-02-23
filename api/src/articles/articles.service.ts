import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

import {Article, ArticleDocument} from "./schemas/article.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel:Model<ArticleDocument>) {
  }
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdUser = new this.articleModel(createArticleDto);
    return createdUser.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().populate( { path: 'author',
        select: '-password', // exclude password field
  }).exec();
  }

  // create(createArticleDto: CreateArticleDto) {
  //   return 'This action adds a new article';
  // }
  //
  // findAll() {
  //   return `This action returns all articles`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} article`;
  // }
  //
  // update(id: number, updateArticleDto: UpdateArticleDto) {
  //   return `This action updates a #${id} article`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }
}
