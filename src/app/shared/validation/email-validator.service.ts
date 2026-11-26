import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{
    // validate(control: AbstractControl): Observable<ValidationErrors | null> {
    //     const email = control.value;
    //     console.log({email});
    //     return of({
    //         emailTaken: true,
    //     }).pipe(
    //         delay( 2000 ),
    //     );
    // }
    constructor(private http:HttpClient){}
    
    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email:string = control.value;

        const  httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
            if(email.trim().toLowerCase() === 'admin@google.com'){
                subscriber.next({emailTaken:true});
                subscriber.complete(); // una vez se completa, no emite mas valores
                return; // esto puede quedar "por las dudas", pero no hace falta
            }
            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay( 2000 ),
        );

        return httpCallObservable;
    }
    
}