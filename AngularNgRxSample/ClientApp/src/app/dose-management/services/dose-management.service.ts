import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dose } from '../dose-management.models';

@Injectable({
    providedIn: 'root'
})
export class DoseService {

    constructor() { }

    getAll(): Observable<Dose[]> {
        const dose1 = {id: 1, hp10Dose: 10, remark: 'werken aan de reactor'} as Dose;
        const dose2 = {id: 2, hp10Dose: 20, remark: 'uitstap naar doel'} as Dose;
        const dose3 = {id: 3, hp10Dose: 30, remark: 'test meting'} as Dose;
 
        return Observable.create(function (observer) {
            observer.next([dose1, dose2, dose3]);
            observer.complete();
        })
    }
}