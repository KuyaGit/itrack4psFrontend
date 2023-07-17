import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HomeModule } from './template/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SchoolregistrarComponent } from './schoolregistrar/schoolregistrar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SchoolregistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
