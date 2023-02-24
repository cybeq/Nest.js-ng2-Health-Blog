import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Article} from "../interfaces/article.interface";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

    getCategories():any {
    const categories = this.http.get('/api/articles/categories').toPromise();
    return categories;
    }

    postArticle(article:Article):any{

      return this.http.post('/api/articles', article);

    }
    getArticle(id:string):any{
      return this.http.get(`/api/articles/id/${id}`);
    }

    getArticleByProps(category:string, id:string, title:string){
        return this.http.post('/api/articles/read', {category, id, title})
    }
    getArticleByCat(category:string){
        return this.http.post('/api/articles/cat', {category:category})
    }

  postImages(images: FileList, photos:string[]) {
    let headers = new HttpHeaders();

    headers.set('Content-Type', 'multipart/form-data; boundary=3123133');
    headers.set('Accept', "multipart/form-data");

    const formData: FormData = new FormData();
    console.log('imgs', images)
    for (let i = 0; i < Array.from(images).length; i++) {
      formData.append('files', images[i]);
      formData.append('names', photos[i])
    }


    return this.http.post('/api/files', formData, { headers });
  }
}
