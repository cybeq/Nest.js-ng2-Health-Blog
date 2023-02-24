import { Component } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../interfaces/article.interface";
import {ActivatedRoute} from "@angular/router";
import {TabEmitService} from "../../services/emitters/tab-emit.service";
import {Meta, Title} from "@angular/platform-browser";
import {Location} from "@angular/common";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {
  article:any;
  constructor(private route: ActivatedRoute, private articleService:ArticleService, private tabEvent:TabEmitService,
              private titleService: Title, private meta:Meta, private location: Location){

     this.articleService.getArticleByProps(
    this.route.snapshot.paramMap.get('cat')|| '',
    this.route.snapshot.paramMap.get('id') || '',
    this.route.snapshot.paramMap.get('title')|| '').subscribe(res=>{
               // @ts-ignore
              this.tabEvent.activeTabEmitter.emit(this.route.snapshot.paramMap.get('cat'));
         })

    this.articleService.getArticle(this.route.snapshot.paramMap.get('id') || '').subscribe((res:any)=>{
      console.log(this.route.snapshot.paramMap.get('id') || '')
      console.log(res)
      this.article = res;
      this.setMeta(res)
    })


  }

  setMeta(article:any){
    const currentUrl = window.location.href;
    const domain = new URL(currentUrl).hostname;

    this.meta.updateTag({name: 'canonical', content: `https://www.pielegniarkaonline.pl/article/${article.category}/${article._id}/${article.theme}/${article.title}`});
  }


}
