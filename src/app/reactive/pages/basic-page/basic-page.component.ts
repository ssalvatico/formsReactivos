import { Component } from '@angular/core';

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
export class BasicPageComponent {}
