import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {TabEmitService} from "../../services/emitters/tab-emit.service";
@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit{
  list: any
  page:any; cat:any;
  pageQty = 1 ;
  itemsOnPage=5;
  paginatedList = [{title:'none'}];

  constructor(private articleService:ArticleService, private route:ActivatedRoute, private router:Router, private tabEmit:TabEmitService) {
    this.init()
  }
  init(){
    this.page = this.route.snapshot.paramMap.get('page')
    this.cat = this.route.snapshot.paramMap.get('cat')

    this.articleService.getArticleByCat(this.route.snapshot.paramMap.get('cat') || '').subscribe((res:any)=>{
      this.list = res.reverse()
      this.paginate()
      this.pageQty     = Math.ceil(this.list.length/this.itemsOnPage)
      this.tabEmit.activeTabEmitter.emit(this.cat)
      if(this.page > this.pageQty) {
        this.router.navigate([`browse/${this.cat}/${this.pageQty}`]);
        this.page = this.pageQty
        this.paginate()
      }
      if(this.page < 1) {
        this.router.navigate([`browse/${this.cat}/1`]);
        this.page = 1
        this.paginate()
      }
    })
  }

  paginate(){
    this.paginatedList = []
      const lastIndex = parseInt(this.page) * this.itemsOnPage;
      const startIndex= lastIndex - this.itemsOnPage;
      for(let i=startIndex; i<lastIndex; i++)
        { // @ts-ignore
          if(this.list[i])
          { // @ts-ignore
            this.paginatedList.push(this.list[i])
          }
        }

  }
  goToPage(page:any){
    switch(page){
      case 'backward':
        if(parseInt(this.page) -1 < 1 || parseInt(this.page) -1 > this.pageQty) {
          this.page = 1;
          this.paginate()
          return;
        }
        this.page = parseInt(this.page) -1;
        break;
      case 'forward' :
        if(parseInt(this.page) +1 > this.pageQty || parseInt(this.page) +1 < 1 ) {
          this.page = this.pageQty
          this.paginate()
           this.router.navigate([`browse/${this.cat}/${this.pageQty}`]);
           return;
        }
        this.page = parseInt(this.page) +1;
      break;
    }
    this.paginate()
    this.router.navigate([`browse/${this.cat}/${this.page}`])
  }

  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      // @ts-ignore
    ).subscribe((event: NavigationEnd) => {
        this.init()
    });
  }
}
