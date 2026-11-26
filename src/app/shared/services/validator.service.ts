import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {

    public firstNameAndLastnamePattern:string = '([a-zA-Z]+)([a-zA-Z]+)';
    public emailPattern:string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

    cantBeAdmin = ( control:FormControl ): ValidationErrors | null => {
        const value:string = control.value.trim().toLowerCase();
        if(value === 'admin'){
            return {
                cantBeAdmin: true,
            };
        }
        return null;
    }

    isNotValidField(form:FormGroup, field:string):boolean|null{
        return form.controls[field].errors && form.controls[field].touched;
    }



    fieldOneEqualsFieldTwo(field1:string, field2:string){
        return ( formGroup:AbstractControl ): ValidationErrors | null => {
            const fieldvalue1 = formGroup.get(field1)?.value;
            const fieldvalue2 = formGroup.get(field2)?.value;

            if(fieldvalue1 !== fieldvalue2){
                formGroup.get(field2)?.setErrors({ notEqual: true });
                return { notEqual: true };
            }
            formGroup.get(field2)?.setErrors(null);
            return null;
        }
    }
}