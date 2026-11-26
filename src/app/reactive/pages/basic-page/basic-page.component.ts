import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minLength } from '@angular/forms/signals';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'reactive-basic-page',
  standalone: false,
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit{

  public myForm:FormGroup;

  // para hacerlo con Angular, puedo injectar un servicio de angular forms (FormBuilder)
  constructor(
    private formBuilder:FormBuilder,
    private validatorService:ValidatorService,
  ) {
    this.myForm = this.formBuilder.group({
      name      : ['', [Validators.required, Validators.minLength(3)], ],
      price     : [0, [Validators.required, Validators.min(0)], ],
      inStorage : [0, [Validators.required, Validators.min(0)], ],
    })

  }
  ngOnInit(): void {
    this.myForm.reset();
  }

  isNotValidField( field: string ): boolean | null {
    return this.validatorService.isNotValidField(this.myForm, field);
  }

  //? i18nSelect ?
  getFieldError( field: string ): string | null {
    if( this.myForm.controls[field] && this.myForm.controls[field].errors) {
      const errors = this.myForm.controls[field].errors;

      for (const key of Object.keys(errors)) {
        switch(key){
          case 'required':
            return 'Este campo es obligatorio';
          case 'minlength':
            return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres`;
          case 'min':
            return `Este campo debe ser mayor a ${ errors['min'].min }`;
          default:
            return 'requisito desconocido';
        }
      }
    }
    return null;
  }

  onSave(){
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
