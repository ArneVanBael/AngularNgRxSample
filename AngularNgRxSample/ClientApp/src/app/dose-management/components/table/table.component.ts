import { Component, OnInit, Input } from '@angular/core';
import { Dose } from '../../dose-management.models';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducer';
import { Store, select } from '@ngrx/store';
import { openDoseAdjustmentModalAction } from '../../store/dose-management.actions';
import { isModalOpen } from '../../store/dose-management.reducer';

@Component({
    selector: 'app-dose-management-table',
    templateUrl: './table.component.html',

})
export class DoseManagementTableComponent implements OnInit {
    @Input() doses:Dose[];

    isModalOpen$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.isModalOpen$ = store.pipe(select(isModalOpen));
    }

    ngOnInit(): void {
        console.log(this.doses);
    }

    editDose(dose: Dose) {
        this.store.dispatch(openDoseAdjustmentModalAction({payload: {selectedDose: dose}}));
    }
}
