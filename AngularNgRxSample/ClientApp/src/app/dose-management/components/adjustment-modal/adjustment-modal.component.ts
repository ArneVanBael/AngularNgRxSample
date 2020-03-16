import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { Dose } from '../../dose-management.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppState } from 'src/app/reducer';
import { Store, select } from '@ngrx/store';
import { closeDoseAdjustmentModalAction, updatedDoseAction } from '../../store/dose-management.actions';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { selectedDose } from '../../store/dose-management.reducer';

@Component({
    selector: 'app-adjustment-model',
    templateUrl: './adjustment-modal.component.html'
})
export class DoseAdjustmentModalComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isOpen: boolean;
    @ViewChild('content') private content;
    selectedDoseSubcription: Subscription;

    // form
    doseForm: FormGroup;
    selectedDose: Dose;
    remark: string;
    hp10Dose: number;

    constructor(private modalService: NgbModal, private store: Store<AppState>, private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.checkToOpenModal();
    }

    ngOnDestroy(): void {
        this.selectedDoseSubcription?.unsubscribe();
    }

    checkToOpenModal(): void {
        if (this.isOpen) {
            this.modalService.open(this.content, { centered: true }).result.then((result) => {
                this.store.dispatch(closeDoseAdjustmentModalAction());
            },
                (reason) => {
                    this.store.dispatch(closeDoseAdjustmentModalAction());
                }
            )

            this.selectedDoseSubcription = this.store.pipe(select(selectedDose)).subscribe(dose => {
                this.selectedDose = dose;
                this.remark = dose.remark;
                this.hp10Dose = dose.hp10Dose;
                this.createForm();
            });
        } else {
            this.modalService.dismissAll();
        }
    }

    createForm() {
        this.doseForm = this.fb.group({
            remark: new FormControl(this.remark),
            hp10Dose: new FormControl(this.hp10Dose)
        });
    }

    onSubmitDoseForm() {
        console.log("submit form");
        const updatedDose = { ...this.selectedDose, hp10Dose: this.doseForm.value.hp10Dose, remark: this.doseForm.value.remark } as Dose;
        this.store.dispatch(updatedDoseAction({ payload: { updatedDose } }));
    }
}
