import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dose } from '../../dose-management.models';
import { DoseManagementState, selectDosesLoaded, selectDosesAreLoading, selectDoses } from '../../store/dose-management.reducer';
import { loadDosesAction } from '../../store/dose-management.actions';
import { AppState } from 'src/app/reducer';

@Component({
  selector: 'app-dose-management',
  templateUrl: './dose-management.component.html',

})
export class DoseManagementComponent implements OnInit {
  doses$: Observable<Dose[]> = this.store.pipe(select(selectDoses));
  dosesLoadedMessage$: Observable<string> = this.store.pipe(select(selectDosesLoaded), map(value => value === true ? 'loaded' : 'NOT loaded'));
  dosesAreLoadingMessage$: Observable<string>= this.store.pipe(select(selectDosesAreLoading), map(value => value === true ? 'are loading': 'are NOT loading'));

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

  }

  loadDoses(): void {
    this.store.dispatch(loadDosesAction());
  }
}
