import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'map', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'welcome', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  { path: 'exercise', loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule) },
  { path: 'disease', loadChildren: () => import('./disease/disease.module').then(m => m.DiseaseModule) },
  { path:'**',loadChildren: () => import('./map/map.module').then(m => m.MapModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
