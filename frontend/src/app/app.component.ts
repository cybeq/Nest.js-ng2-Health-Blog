import {AfterViewInit, Component, OnInit} from '@angular/core';

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


  tabPositionOnInit(){

  }
  moveTab(event: MouseEvent){
    const id = (event.target as HTMLElement).id;
    console.log(id)
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
    console.log(distance)
  }
}
