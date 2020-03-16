import { Dose } from "../dose-management.models";
import { loadDosesAction, dosesReceivedAction, openDoseAdjustmentModalAction, closeDoseAdjustmentModalAction, updatedDoseAction } from './dose-management.actions';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';

// SELECTORS
export const selectFeature = createFeatureSelector<DoseManagementState>('doseManagementFeature');

export const selectDosesAreLoading = createSelector(selectFeature, (state: DoseManagementState) => state?.dosesAreLoading);
export const selectDosesLoaded = createSelector(selectFeature, (state: DoseManagementState ) => state?.dosesLoaded);
export const selectDoses = createSelector(selectFeature, (state:DoseManagementState) => state?.doses);
export const isModalOpen = createSelector(selectFeature, (state: DoseManagementState) => state?.isModalOpen);
export const selectedDose = createSelector(selectFeature, (state: DoseManagementState) => state?.selectedDose);

// STATE
export interface DoseManagementState {
    doses: Dose[];
    selectedDose?: Dose,
    isModalOpen: boolean,
    dosesLoaded: boolean,
    dosesAreLoading: boolean
}

export const initialState : DoseManagementState = {
    doses: [],
    selectedDose: undefined,
    dosesAreLoading: false,
    dosesLoaded : false,
    isModalOpen: false
};

// REDUCER
const _doseManagementReducer = createReducer(initialState,
  on(loadDosesAction, state => loadDoses(state)),
  on(dosesReceivedAction, (state, {payload}) => dosesReceived(state, payload.doses)),
  on(openDoseAdjustmentModalAction, (state, {payload}) => openDoseAdjustmentModal(state, payload.selectedDose)),
  on(closeDoseAdjustmentModalAction, (state) => closeDoseAdjustmentModal(state)),
  on(updatedDoseAction, (state, {payload}) => updateDose(state, payload.updatedDose))
);
 
const loadDoses = (state: DoseManagementState) => {
    return {...state, dosesAreLoading: true};
};

const dosesReceived = (state: DoseManagementState, doses: Dose[]) => {
    return {...state, dosesAreLoading: false, dosesLoaded: true, doses: doses};
}

const openDoseAdjustmentModal = (state: DoseManagementState, selectedDose: Dose) => {
    return {...state, selectedDose: selectedDose, isModalOpen: true};
}

const closeDoseAdjustmentModal = (state: DoseManagementState) => {
    return {...state, isModalOpen: false};
}

const updateDose = (state: DoseManagementState, updatedDose: Dose) => {
    let doses: Dose[] = state.doses.map((dose: Dose) => {
        if(dose.id !== updatedDose.id) return dose;
        return {...dose, remark: updatedDose.remark, hp10Dose: updatedDose.hp10Dose};
    });

    return {...state, doses: doses, isModalOpen: false};
}

export function doseManagementReducer(state: DoseManagementState, action) {
    return _doseManagementReducer(state, action);
}