import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {WriterComponent} from "./components/writer/writer.component";
import {ArticleComponent} from "./components/article/article.component";
import {BrowseComponent} from "./components/browse/browse.component";
import {WriterGuard} from "./middleware/writer.guard";
import {LoginGuard} from "./middleware/login.guard";



const routes: Routes = [
  { path: '', redirectTo: '/browse/Zdrowie/1', pathMatch: 'full' },
  {path:'panel/login', component: LoginComponent, canActivate:[LoginGuard] },
  {path:'panel/writer', component: WriterComponent, canActivate:[WriterGuard]},
  {path:'article/:cat/:id/:theme/:title', component:ArticleComponent},
  {path:'browse/:cat/:page', component:BrowseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
