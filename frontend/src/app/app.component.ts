import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Route, Router} from "@angular/router";
import {BrowseComponent} from "./components/browse/browse.component";
import {TabEmitService} from "./services/emitters/tab-emit.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'frontend';
  categories = [{name:'Zdrowie', color:'cyan'},
    {name:'Choroby', color:'black'},
    {name:'Leki', color:'green'},
    {name:'Ciąża i dziecko', color:'yellow'},
    {name:'Zdrowie psychiczne', color:'lightblue'},
    {name:'Dieta', color:'purple'},
    {name:'Uroda', color:'pink'},
    {name:'Medycyna estetyczna', color:'orange'}]
  movableWidth= 0 ;
  legoWidth = 0;
  legoColor = 'cyan'
  activeTab:any;
  constructor(private router: Router, private tabEmit: TabEmitService) {
    this.tabEmit.activeTabEmitter.subscribe(res=>{
      this.activeTab = res;
      this.moveTab(null, `cat_${res}`)
    })
  }
  moveTab(event: any, noevent?:any){
    let id;
    if(noevent) id = noevent
    else  id = (event.target as HTMLElement).id;

    let distance = 0;
    for(let all of this.categories){
      if(`cat_${all.name}` === id) {
        this.legoColor = all.color
        break;
      }
      // @ts-ignore
      distance+=document.getElementById(`cat_${all.name}`).offsetWidth
    }
    // @ts-ignore
    this.legoWidth = document.getElementById(id).offsetWidth

    this.movableWidth = distance
  }
  moveTabOut(event:any){
      this.moveTab(null, `cat_${this.activeTab}`)
  }
}
