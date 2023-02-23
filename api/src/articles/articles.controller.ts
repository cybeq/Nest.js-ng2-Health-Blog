import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import {WritterMiddleware} from "../middleware/writer.middleware";
// import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: any, @Session() session) {
    console.log(createArticleDto)
    createArticleDto.author = session.userId;
    console.log(createArticleDto)
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
  @Get('categories')
  getCategories(){
    return this.articlesService.getCategories()
  }

  @Post('read')
  getArticleByProps(@Body() params){
    return this.articlesService.getArticleByProps(params)
  }
  @Post('cat')
  getArticlesByCat(@Body() body){
    return this.articlesService.getArticlesByCat(body.category);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articlesService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articlesService.update(+id, updateArticleDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articlesService.remove(+id);
  // }
}
