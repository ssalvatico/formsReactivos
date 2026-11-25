import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string,
}
@Component({
  selector: 'shared-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

  public selectedItem = '';

  public reactiveMenu: MenuItem[] = [
    {title: 'Basicos', route: './reactive/basic'},
    {title: 'Dinámicos', route: './reactive/dynamic'},
    {title: 'Switches', route: './reactive/switches'},
  ]
  
  public authMenu: MenuItem[] = [
    {title: 'Registrarse', route: './auth'},
  ]
  
}
