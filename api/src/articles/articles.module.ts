import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {MongooseModule} from "@nestjs/mongoose";

import {Article, ArticleSchema} from "./schemas/article.schema";
import {Categories, CategoriesSchema} from "./schemas/categories.schema";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema },
                                      { name: Categories.name, schema:CategoriesSchema}
                                     ]),
      NestjsFormDataModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
