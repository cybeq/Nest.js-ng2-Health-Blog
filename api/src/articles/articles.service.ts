import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
// import { UpdateArticleDto } from './dto/update-article.dto';

import {Article, ArticleDocument} from "./schemas/article.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Categories, CategoriesDocument} from "./schemas/categories.schema";

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel:Model<ArticleDocument>,
              @InjectModel(Categories.name) private categoriesModel:Model<CategoriesDocument>) {
  }
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().populate( { path: 'author',
        select: '-password', // exclude password field
  }).exec();
  }
  async getCategories() {
    return this.categoriesModel.find();
  }

  async getArticleByProps(props){
    return this.articleModel.findOne(props).populate( { path: 'author',
      select: '-password', // exclude password field
    }).exec();
  }
  getArticlesByCat(category) {
    return this.articleModel.find({category}).populate( { path: 'author',
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
