import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validation/validators';
import { ValidatorService } from '../../../shared/services/validator.service';
import { EmailValidatorService } from '../../../shared/validation/email-validator.service';

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
    @Inject(ValidatorService) private validatorService: ValidatorService, // Si no hago esto tira error
    private emailValidator:EmailValidatorService,
  ){
    this.myForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ],[]],
      // email: ['',[ Validators.required, Validators.pattern(this.validatorService.emailPattern) ],[ new EmailValidatorService() ]],
      email: ['',[ Validators.required, Validators.pattern(this.validatorService.emailPattern) ],[ this.emailValidator ]],
      username: ['',[ Validators.required, this.validatorService.cantBeAdmin ],[]],
      password: ['',[ Validators.required, Validators.minLength(6) ],[]],
      password2: ['',[ Validators.required ],[]],
    },{
      validators: [
        this.validatorService.fieldOneEqualsFieldTwo('password', 'password2'),
      ]
    });
  }

  isNotValidField( field:string ){
    return this.validatorService.isNotValidField(this.myForm, field);
  }

  onSave(){
    this.myForm.markAllAsTouched()
  }
}
