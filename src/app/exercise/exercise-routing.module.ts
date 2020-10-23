import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExerciseComponent} from './exercise.component'
import {BudaoComponent} from '../budao/budao.component'
const routes: Routes = [
  {path: '', component: ExerciseComponent},
  {path:'budao',component:BudaoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
