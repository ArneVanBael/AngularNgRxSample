
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { DoseService } from '../services/dose-management.service'
import { doseManagementActionsEnum, dosesReceivedAction } from './dose-management.actions';

@Injectable()
export class DoseManagementEffects {

    loadDoses$ = createEffect(() => this.actions$.pipe(
        ofType(doseManagementActionsEnum.loadDoses),
        mergeMap(() => this.doseService.getAll()
            .pipe(
                map(doses => (dosesReceivedAction({ payload: { doses } })))
        )
    )));

    constructor(
        private actions$: Actions,
        private doseService: DoseService
    ) { }
}
