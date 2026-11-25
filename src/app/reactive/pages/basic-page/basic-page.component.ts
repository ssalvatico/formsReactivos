import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minLength } from '@angular/forms/signals';

@Component({
  selector: 'reactive-basic-page',
  standalone: false,
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit{

  // public myForm:FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], []),
  // });

  public myForm:FormGroup;

  public errorMessages = {
    "required"  : "Este campo es obligatorio",
    "minLength" : "Este campo requiere 3 caracteres o más",
    "min"       : "Este campo debe ser mayor a 0",
  };

  // para hacerlo con Angular, puedo injectar un servicio de angular forms
  constructor( private formBuilder:FormBuilder ) {
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
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
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
