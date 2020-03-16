import { ActionReducerMap} from '@ngrx/store';
import { DoseManagementState, doseManagementReducer } from './dose-management/store/dose-management.reducer';

export interface AppState {
    doseManagement: DoseManagementState
};