import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiseaseComponent} from './disease.component'
import {DiseaseRegisterComponent} from '../disease-register/disease-register.component'
import {AdminGuard} from '../guards/admin.guard'
const routes: Routes = [
  {path: '', component: DiseaseComponent},
  {path:'admin',component:DiseaseRegisterComponent}//,canActivate:[AdminGuard]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseaseRoutingModule { }
