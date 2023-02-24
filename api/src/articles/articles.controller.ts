import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,

} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';


@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Session() session) {

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
