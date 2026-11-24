import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string,
}
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
export class SideMenuComponent {

  public reactiveMenu: MenuItem[] = [
    {title: 'Basicos', route: './reactive/basic'},
    {title: 'Dinámicos', route: './reactive/dynamic'},
    {title: 'Switches', route: './reactive/switches'},
  ]
  
  public authMenu: MenuItem[] = [
    {title: 'Registrarse', route: './auth'},
  ]
  
}
