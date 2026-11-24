import { Component } from '@angular/core';

@Component({
  selector: 'shared-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SideMenuComponent {}
