import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-basic-page',
  standalone: false,
  templateUrl: './basic-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BasicPageComponent {

  // public myForm:FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], []),
  // });

  public myForm:FormGroup;

  // para hacerlo con Angular, puedo injectar un servicio de angular forms
  constructor( private formBuilder:FormBuilder ) {
    this.myForm = this.formBuilder.group({
      name: [''],
      price: [0],
      inStorage: [0],
    })

  }

  onSave(){
    console.log(this.myForm.value);
  }

}
