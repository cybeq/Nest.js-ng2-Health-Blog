import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

    getCategories():any {
    const categories = this.http.get('/api/articles/categories').toPromise();
    return categories;
    }

    postArticle(article:any):any{

      return this.http.post('/api/articles', article);

    }

    getArticleByProps(category:string, id:string, title:string){
        return this.http.post('/api/articles/read', {category, id, title})
    }
    getArticleByCat(category:string){
        return this.http.post('/api/articles/cat', {category:category})
    }
}
