import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseaseRoutingModule } from './disease-routing.module';
import { DiseaseRegisterComponent } from '../disease-register/disease-register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  declarations: [DiseaseRegisterComponent],
  imports: [
    CommonModule,
    NzToolTipModule,
    NzTableModule,
    NzDividerModule,
    NzStatisticModule,
    NzCardModule,
    DiseaseRoutingModule,NzFormModule,FormsModule,ReactiveFormsModule,NzButtonModule,NzIconModule,NzDatePickerModule,NzCheckboxModule,NzRadioModule
  ]
})
export class DiseaseModule { }
