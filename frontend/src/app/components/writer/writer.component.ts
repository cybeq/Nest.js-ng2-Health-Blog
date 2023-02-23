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
  images:any =[];
  files:any;

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

  public attachFiles(event: any) {
    this.files = Array.from(event.target.files);

    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        if(i>2) break;
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          // do something with the data URL, e.g. display the image preview
          if(this.images.length<1)this.images.push(dataUrl)
          else this.images.unshift(dataUrl)
          if(this.images.length>3) this.images.pop()
        };
        reader.readAsDataURL(this.files[i]);
      }
    }
  }


}
