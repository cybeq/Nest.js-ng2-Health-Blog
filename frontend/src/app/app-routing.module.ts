import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {WriterComponent} from "./components/writer/writer.component";
import {ArticleComponent} from "./components/article/article.component";
import {BrowseComponent} from "./components/browse/browse.component";

// const categories = [{name:'Zdrowie', color:'cyan'},
//   {name:'Choroby', color:'black'},
//   {name:'Leki', color:'green'},
//   {name:'Ciąża i dziecko', color:'yellow'},
//   {name:'Zdrowie psychiczne', color:'lightblue'},
//   {name:'Dieta', color:'purple'},
//   {name:'Uroda', color:'pink'},
//   {name:'Medycyna estetyczna', color:'orange'}]

const routes: Routes = [
  {path:'panel/login', component: LoginComponent },
  {path:'panel/writer', component: WriterComponent},
  {path:'article/:cat/:id/:title', component:ArticleComponent},
  {path:'browse/:cat/:page', component:BrowseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
