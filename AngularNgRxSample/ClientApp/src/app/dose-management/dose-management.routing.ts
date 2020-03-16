import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoseManagementComponent } from './components/dose-management/dose-management.component';

const routes: Routes = [
  {
    path: '',
    component: DoseManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoseMangementRoutingModule { }