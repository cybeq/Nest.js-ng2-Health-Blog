import { Component } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../interfaces/article.interface";
import {ActivatedRoute} from "@angular/router";
import {TabEmitService} from "../../services/emitters/tab-emit.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  constructor(private route: ActivatedRoute, private articleService:ArticleService, private tabEvent:TabEmitService) {

     this.articleService.getArticleByProps(
    this.route.snapshot.paramMap.get('cat')|| '',
    this.route.snapshot.paramMap.get('id') || '',
    this.route.snapshot.paramMap.get('title')|| '').subscribe(res=>{
       // @ts-ignore
       this.tabEvent.activeTabEmitter.emit(this.route.snapshot.paramMap.get('cat'));
  })
}


}
