import { NgModule } from '@angular/core';
import { DoseManagementComponent } from './components/dose-management/dose-management.component';
import { DoseMangementRoutingModule } from './dose-management.routing';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { doseManagementReducer } from './store/dose-management.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DoseManagementEffects } from './store/dose-management.effects';
import { DoseManagementTableComponent } from './components/table/table.component';
import { DoseAdjustmentModalComponent } from './components/adjustment-modal/adjustment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DoseManagementComponent,
    DoseManagementTableComponent,
    DoseAdjustmentModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.forFeature('doseManagementFeature', doseManagementReducer),
    EffectsModule.forFeature([DoseManagementEffects]),
    DoseMangementRoutingModule,
  ],
  providers: [
  ],
  exports: [
    StoreModule
  ]
}) 
export class DoseManagementModule { }
 