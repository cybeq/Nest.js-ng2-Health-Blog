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
  imagesNames:any =[]
  files:any;
  rawFiles:any =[];

constructor(private articleService:ArticleService) {
}
async ngOnInit() {
  this.categoriesList = await this.articleService.getCategories();

}
postArticle(){
  console.log(this.imagesNames)
  this.articleService.postArticle({title:this.title, content:this.content, author:'', category:this.categoriesSelect, photos:this.imagesNames || null, theme:this.themeSelect}).subscribe((res:any)=>{
    if(res.createdAt){
      this.articleService.postImages(this.rawFiles).subscribe((res:any)=>{

      })
    }
  })
}

  public attachFiles(event: any) {
    this.files = event.target.files;
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        const fileName = `${Date.now()}${this.files[i].name}`.replaceAll(' ', '')
        if(i>2) break;
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          // do something with the data URL, e.g. display the image preview
          if(this.images.length<1) {
            this.images.push(dataUrl)
            this.imagesNames.push(fileName)
            this.rawFiles.push(this.files[i]);
          }
          else {
            this.images.unshift(dataUrl)
            this.imagesNames.unshift(fileName)
            this.rawFiles.unshift(this.files[i]);
          }
          if(this.images.length>3) {
            this.images.pop()
            this.imagesNames.pop()
            this.rawFiles.pop()
          }
        };
        reader.readAsDataURL(this.files[i]);
      }
    }
  }


}
