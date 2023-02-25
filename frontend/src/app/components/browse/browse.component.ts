import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
import {TabEmitService} from "../../services/emitters/tab-emit.service";
import {Title, Meta} from "@angular/platform-browser";
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
  paginatedList = [{title:'none', category:'Zdrowie', _id:'none', content:'', theme:'', images:'', photos: undefined
  }];

  constructor(private articleService:ArticleService, private route:ActivatedRoute, private router:Router, private tabEmit:TabEmitService,
              private titleService: Title, private meta:Meta) {

    this.init()
  }
  init(){
    this.page = this.route.snapshot.paramMap.get('page')
    this.cat = this.route.snapshot.paramMap.get('cat')
    this.setMeta()

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

  getShorterContent(content:string): string{
      return `${content.slice(0,170)}...`
  }

  private setMeta(){
    this.titleService.setTitle(`Porady - ${this.cat} - Pielegniarka Online`);
    switch(this.cat){
      case "Zdrowie":
        this.meta.updateTag({ name: 'description', content: 'Wartościowe artykuły na tematy związane ze zdrowiem. Sprawdź naszą stronę i bądź na bieżąco z najnowszymi informacjami na temat zdrowia oraz skutecznymi sposobami jego utrzymania. Bez porad medycznych czy diagnoz, jedynie sprawdzone informacje na temat zdrowego stylu życia i chorób, w celu edukacji i podniesienia świadomości zdrowotnej.' });
        this.meta.updateTag({name:'keywords', content:'zdrowie, medycyna, lekarze, choroby, zdrowe odżywianie, fitness, sport, profilaktyka, rehabilitacja'});
        break;
      case "Choroby":
        this.meta.updateTag({ name: 'description', content: 'Witaj na naszej stronie! Znajdziesz tutaj wiele wartościowych artykułów na temat różnych chorób. Dowiesz się, jakie są przyczyny i objawy chorób, jak je leczyć i jak sobie z nimi radzić. Nasza strona to doskonałe źródło informacji dla każdego, kto chce poznać więcej na temat zdrowia i chorób.'});
        this.meta.updateTag({name:'keywords', content:'choroby, objawy, diagnoza, leczenie, medycyna, zdrowie, lekarze, badania, terapia, farmakoterapia'});
        break;
      case "Leki":
        this.meta.updateTag({ name: 'description', content: 'Znajdź informacje na temat różnych leków, włącznie z ich dawkowaniem, składem, skutkami ubocznymi oraz wskazaniami. Na naszej stronie znajdziesz aktualne artykuły na temat najnowszych leków, ich zastosowań i bezpieczeństwa stosowania.'});
        this.meta.updateTag({name:'keywords', content:'leki, farmakologia, apteka, recepty, dawkowanie, skutki uboczne, interakcje leków, działanie leków, leczenie farmakologiczne'});
        break;

      case "Dieta":
        this.meta.updateTag({ name: 'description', content: 'Czytaj najnowsze artykuły o diecie na naszej stronie. Dowiedz się jakie produkty warto włączyć do swojego jadłospisu, jakie unikać, aby osiągnąć swoje cele zdrowotne i zrzucić zbędne kilogramy. Znajdź najlepsze przepisy na zdrowe i smaczne potrawy.'});
        this.meta.updateTag({name:'keywords', content:'dieta, odchudzanie, zdrowe odżywianie, suplementy diety, dieta wegetariańska, dieta wegańska, dieta ketogeniczna, dieta paleo, dieta bezgl'});
        break;

      case "Ciąża i dziecko":
        this.meta.updateTag({ name: 'description', content: 'Zapraszamy na naszą stronę, gdzie znajdziesz wiele artykułów na temat ciąży, karmienia i opieki nad dzieckiem. Nasza wiedza pozwoli Ci zrozumieć różne aspekty ciąży i macierzyństwa oraz pomóc w utrzymaniu zdrowia dla Ciebie i Twojego dziecka.'});
        this.meta.updateTag({name:'keywords', content:'ciąża, poród, niemowlęta, wychowanie dzieci, macierzyństwo, pielęgnacja dziecka, laktacja, planowanie ro'});
        break;

      case "Uroda":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artykuły na temat urody i kosmetyki. Znajdź porady i informacje na temat makijażu, pielęgnacji skóry, włosów i paznokci.'});
        this.meta.updateTag({name:'keywords', content:'uroda, kosmetyki, pielęgnacja skóry, makijaż, fryzury, moda, wellness, spa, medycyna estetyczna'});
        break;

      case "Zdrowie psychiczne":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artykuły na temat zdrowia psychicznego. Znajdź porady i informacje na temat radzenia sobie z depresją, lękiem, stresem oraz otrzymuj wsparcie i motywację w codziennym życiu.'});
        this.meta.updateTag({name:'keywords', content:'zdrowie psychiczne, psychoterapia, depresja, lęki, stres, terapia, zdrowie emocjonalne, psychologia, samorozwój, terapia behawioralna'});
        break;
      case "Medycyna estetyczna":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artykuły na temat medycyny estetycznej. Znajdź porady i informacje na temat zabiegów kosmetycznych, takich jak botoks, kwas hialuronowy, liposukcja, czy laseroterapia.'});
        this.meta.updateTag({name:'keywords', content:'medycyna estetyczna, botox, kwas hialuronowy, mezoterapia, zabiegi kosmetyczne, modelowanie sylwetki, usuwanie zmarszczek, usuwanie cellulitu, depilacja laserowa, lifting twarzy'});
        break;



    }
  }

}
