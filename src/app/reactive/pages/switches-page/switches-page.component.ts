import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'reactive-switches-page',
  standalone: false,
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  public myForm:FormGroup;

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(
      private formBuilder:FormBuilder,
      private validatorService:ValidatorService,
    ) {
    this.myForm = this.formBuilder.group({
      gender:[ 'M',[Validators.required], ],
      wantNotifications: [ true, [Validators.required], ],
      termsAndConditions: [ false, [Validators.requiredTrue], ],
    });
  }
  ngOnInit(): void {
    this.myForm.reset();
  }

  isNotValidField( field: string ): boolean | null {
    return this.validatorService.isNotValidField(this.myForm, field);
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    this.myForm.reset();
  }

}
