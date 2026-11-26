import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validation/validators';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'auth-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class RegisterPageComponent {

  public myForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private validatorService:ValidatorService,
  ){
    this.myForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ],[]],
      email: ['',[ Validators.required, Validators.pattern(this.validatorService.emailPattern) ],[]],
      username: ['',[ Validators.required, this.validatorService.cantBeAdmin ],[]],
      password: ['',[ Validators.required, Validators.minLength(6) ],[]],
      password2: ['',[ Validators.required ],[]],
    });
  }

  isNotValidField( field:string ){
    return this.validatorService.isNotValidField(this.myForm, field);
  }

  onSave(){
    this.myForm.markAllAsTouched()
  }
}
