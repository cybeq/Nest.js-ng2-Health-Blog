import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Category} from "../../interfaces/category.interface";
import {Article} from "../../interfaces/article.interface";
@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})
export class WriterComponent implements OnInit{
  categoriesList?: Category[];
  categoriesSelect = "Zdrowie";
  title:any;
  content:any;
  themeSelect:any = "casual";

constructor(private articleService:ArticleService) {
}
async ngOnInit() {
  this.categoriesList = await this.articleService.getCategories();
  console.log(this.categoriesList)
}
postArticle(){
  this.articleService.postArticle({title:this.title, content:this.content, author:'', category:this.categoriesSelect, photos:[], theme:this.themeSelect}).subscribe((res:any)=>{
    console.log(res)
  })
}

}
