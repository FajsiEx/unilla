import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select';
import { SelectComponent } from './components/select/select.component';
import { ProblemPageComponent } from './pages/problem-page/problem-page.component';
import {FormsModule} from '@angular/forms';
import { ResultsPageComponent } from './pages/results-page/results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SelectComponent,
    ProblemPageComponent,
    ResultsPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSelectModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
