import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { AsideMenuComponent } from '../aside-menu/aside-menu';

@Component({
  selector: 'descktop',
  imports: [
    HeaderComponent,
    AsideMenuComponent
  ],
  templateUrl: './descktop.html',
  styleUrl: './descktop.css',
})
export class DescktopComponent {
  seeComponent(component: string){

  }
}
