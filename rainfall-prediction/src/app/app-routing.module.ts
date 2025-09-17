import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PredictorComponent } from './predictor/predictor.component';
import { ResultComponent } from './result/result.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home Page
  { path: 'predictor', component: PredictorComponent },// Predictor page
  { path: 'result', component: ResultComponent } // Result page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
