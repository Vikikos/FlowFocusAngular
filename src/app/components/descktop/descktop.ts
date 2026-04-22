import { Component } from '@angular/core';
import { HeaderComponent } from '../common-components/header/header';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { Service } from './service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'descktop',
  imports: [
    HeaderComponent,
    AsideMenuComponent,
    AsyncPipe
  ],
  templateUrl: './descktop.html',
  styleUrl: './descktop.css',
})
export class DescktopComponent {
  calendars$: Observable<any[]>;
  
  constructor(private service: Service ) {
    this.calendars$ = this.service.getCalendars();
    
    this.calendars$.forEach(calendar =>{
      console.log(calendar)
    });
  }

  seeComponent(component: string){

  }
}
