import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'reactive-dynamic-page',
  standalone: false,
  styleUrl: './dynamic-page.component.css',
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  public myForm:FormGroup;
  public newFavorite:FormControl = new FormControl('',[Validators.required],[])
  //*
  // public gamesForm = new FormGroup({
  //   favoriteGames: new FormArray
  // })

  constructor(private formBuilder:FormBuilder){
      this.myForm = this.formBuilder.group({
        name: ['',[Validators.required, Validators.minLength(3)]],
        //*
        favoriteGames: this.formBuilder.array([
          [ 'Enter The Gungeon', Validators.required ],
          [ 'Hollow Knight', Validators.required ],
          [ 'Last of Us', Validators.required ],
        ]),
      })
  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isNotValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isNotValidFieldInArray(formArray: FormArray, i:number){
    return formArray.at(i).errors
    && formArray.at(i).touched;
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

  getFieldErrorInArray(formArray: FormArray, i: number): string | null {
    const control = formArray.at(i);
    if (control.errors && control.touched) {
      const errors = control.errors;
      
      for (const key of Object.keys(errors)) {
        switch (key) {
      
          case 'required':
            return 'Este campo es obligatorio';

          case 'minlength':
            return `Este campo requiere mínimo ${errors['minlength'].requiredLength} caracteres`;

          default:
            return 'Requisito desconocido';
        }
      }
    }
    return null;
  }

  onAddFavorite(): void {
    if( this.newFavorite.invalid ) return;
    const newFavGame = this.newFavorite.value;
    this.favoriteGames.push(this.formBuilder.control(newFavGame, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavourite( i:number ) {
    this.favoriteGames.removeAt(i);
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();
  }

}
