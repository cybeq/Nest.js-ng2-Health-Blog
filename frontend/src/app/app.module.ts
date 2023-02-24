import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import { WriterComponent } from './components/writer/writer.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { ArticleComponent } from './components/article/article.component';
import { BrowseComponent } from './components/browse/browse.component';
import { CasualComponent } from './components/templates/casual/casual.component';


@NgModule({
  declarations: [
    AppComponent,
    WriterComponent,
    LoginComponent,
    ArticleComponent,
    BrowseComponent,
    CasualComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
