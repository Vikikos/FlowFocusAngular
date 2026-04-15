import { Component } from '@angular/core';
import { HeaderComponent } from '../common-components/header/header';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';

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
