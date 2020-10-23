import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { BudaoComponent } from '../budao/budao.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  declarations: [ExerciseComponent, BudaoComponent],
  imports: [
    CommonModule,
    ExerciseRoutingModule,NzButtonModule,NzInputModule
  ]
})
export class ExerciseModule {

 }
