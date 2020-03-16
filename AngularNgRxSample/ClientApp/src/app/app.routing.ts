import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'dose-management',  loadChildren: () => import('./dose-management/dose-management.module').then(m => m.DoseManagementModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }