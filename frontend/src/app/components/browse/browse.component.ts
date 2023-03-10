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
        this.meta.updateTag({ name: 'description', content: 'Warto??ciowe artyku??y na tematy zwi??zane ze zdrowiem. Sprawd?? nasz?? stron?? i b??d?? na bie????co z najnowszymi informacjami na temat zdrowia oraz skutecznymi sposobami jego utrzymania. Bez porad medycznych czy diagnoz, jedynie sprawdzone informacje na temat zdrowego stylu ??ycia i chor??b, w celu edukacji i podniesienia ??wiadomo??ci zdrowotnej.' });
        this.meta.updateTag({name:'keywords', content:'zdrowie, medycyna, lekarze, choroby, zdrowe od??ywianie, fitness, sport, profilaktyka, rehabilitacja'});
        break;
      case "Choroby":
        this.meta.updateTag({ name: 'description', content: 'Witaj na naszej stronie! Znajdziesz tutaj wiele warto??ciowych artyku????w na temat r????nych chor??b. Dowiesz si??, jakie s?? przyczyny i objawy chor??b, jak je leczy?? i jak sobie z nimi radzi??. Nasza strona to doskona??e ??r??d??o informacji dla ka??dego, kto chce pozna?? wi??cej na temat zdrowia i chor??b.'});
        this.meta.updateTag({name:'keywords', content:'choroby, objawy, diagnoza, leczenie, medycyna, zdrowie, lekarze, badania, terapia, farmakoterapia'});
        break;
      case "Leki":
        this.meta.updateTag({ name: 'description', content: 'Znajd?? informacje na temat r????nych lek??w, w????cznie z ich dawkowaniem, sk??adem, skutkami ubocznymi oraz wskazaniami. Na naszej stronie znajdziesz aktualne artyku??y na temat najnowszych lek??w, ich zastosowa?? i bezpiecze??stwa stosowania.'});
        this.meta.updateTag({name:'keywords', content:'leki, farmakologia, apteka, recepty, dawkowanie, skutki uboczne, interakcje lek??w, dzia??anie lek??w, leczenie farmakologiczne'});
        break;

      case "Dieta":
        this.meta.updateTag({ name: 'description', content: 'Czytaj najnowsze artyku??y o diecie na naszej stronie. Dowiedz si?? jakie produkty warto w????czy?? do swojego jad??ospisu, jakie unika??, aby osi??gn???? swoje cele zdrowotne i zrzuci?? zb??dne kilogramy. Znajd?? najlepsze przepisy na zdrowe i smaczne potrawy.'});
        this.meta.updateTag({name:'keywords', content:'dieta, odchudzanie, zdrowe od??ywianie, suplementy diety, dieta wegetaria??ska, dieta wega??ska, dieta ketogeniczna, dieta paleo, dieta bezgl'});
        break;

      case "Ci????a i dziecko":
        this.meta.updateTag({ name: 'description', content: 'Zapraszamy na nasz?? stron??, gdzie znajdziesz wiele artyku????w na temat ci????y, karmienia i opieki nad dzieckiem. Nasza wiedza pozwoli Ci zrozumie?? r????ne aspekty ci????y i macierzy??stwa oraz pom??c w utrzymaniu zdrowia dla Ciebie i Twojego dziecka.'});
        this.meta.updateTag({name:'keywords', content:'ci????a, por??d, niemowl??ta, wychowanie dzieci, macierzy??stwo, piel??gnacja dziecka, laktacja, planowanie ro'});
        break;

      case "Uroda":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artyku??y na temat urody i kosmetyki. Znajd?? porady i informacje na temat makija??u, piel??gnacji sk??ry, w??os??w i paznokci.'});
        this.meta.updateTag({name:'keywords', content:'uroda, kosmetyki, piel??gnacja sk??ry, makija??, fryzury, moda, wellness, spa, medycyna estetyczna'});
        break;

      case "Zdrowie psychiczne":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artyku??y na temat zdrowia psychicznego. Znajd?? porady i informacje na temat radzenia sobie z depresj??, l??kiem, stresem oraz otrzymuj wsparcie i motywacj?? w codziennym ??yciu.'});
        this.meta.updateTag({name:'keywords', content:'zdrowie psychiczne, psychoterapia, depresja, l??ki, stres, terapia, zdrowie emocjonalne, psychologia, samorozw??j, terapia behawioralna'});
        break;
      case "Medycyna estetyczna":
        this.meta.updateTag({ name: 'description', content: 'Najnowsze artyku??y na temat medycyny estetycznej. Znajd?? porady i informacje na temat zabieg??w kosmetycznych, takich jak botoks, kwas hialuronowy, liposukcja, czy laseroterapia.'});
        this.meta.updateTag({name:'keywords', content:'medycyna estetyczna, botox, kwas hialuronowy, mezoterapia, zabiegi kosmetyczne, modelowanie sylwetki, usuwanie zmarszczek, usuwanie cellulitu, depilacja laserowa, lifting twarzy'});
        break;



    }
  }

}
