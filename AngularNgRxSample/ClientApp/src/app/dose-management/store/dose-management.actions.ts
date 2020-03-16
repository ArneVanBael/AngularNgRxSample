import { createAction, props } from '@ngrx/store';
import {Dose} from '../dose-management.models';

export enum doseManagementActionsEnum {
    loadDoses = '[dose management Page] Load doses',
    dosesReceived = '[dose management Page] Doses received',
    openDoseAdjustmentModal = '[Dose management Page] Open dose adjustment modal',
    closeDoseAdjustmentModal = '[Dose management Page] close dose adjustment modal',
    updatedDoseAction = '[Dose management Page] updated dose',
}

export const loadDosesAction = createAction(doseManagementActionsEnum.loadDoses);
export const dosesReceivedAction = createAction(doseManagementActionsEnum.dosesReceived, props<{payload: {doses: Dose[]}}>());
export const openDoseAdjustmentModalAction = createAction(doseManagementActionsEnum.openDoseAdjustmentModal, props<{payload: {selectedDose: Dose}}>());
export const closeDoseAdjustmentModalAction = createAction(doseManagementActionsEnum.closeDoseAdjustmentModal);
export const updatedDoseAction = createAction(doseManagementActionsEnum.updatedDoseAction, props<{payload: {updatedDose: Dose}}>());