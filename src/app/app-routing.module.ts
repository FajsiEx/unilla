import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ProblemPageComponent} from './pages/problem-page/problem-page.component';
import {ResultsPageComponent} from './pages/results-page/results-page.component';

const routes: Routes = [
  {path: 'problems', component: ProblemPageComponent},
  {path: 'results', component: ResultsPageComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
