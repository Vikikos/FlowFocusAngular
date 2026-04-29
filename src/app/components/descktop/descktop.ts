import { Component } from '@angular/core';
import { HeaderComponent } from '../common-components/header/header';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { Service } from './service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { Pomodoro } from '../pomodoroFunciton/pomodoro/pomodoro';
import { DetailChronometer } from '../chronometer/detail-chronometer/detail-chronometer';
import { SelctFunction } from '../common-components/selct-function/selct-function';
@Component({
  selector: 'descktop',
  imports: [
    HeaderComponent,
    AsideMenuComponent,
    AsyncPipe,
    AsideMenuComponent,
    SelctFunction,
    Pomodoro,
    DetailChronometer
  ],
  templateUrl: './descktop.html',
  styleUrl: './descktop.css',
})
export class DescktopComponent {

  addFunction: boolean = false;
  activeSpace: number = 0;


  funcSpace1: string = 'none';
  funcSpace2: string = 'none';
  funcSpace3: string = 'none';

  toggleFunction(space: number): void {
    this.addFunction = true;
    this.activeSpace = space;
  }


  functionSelected(func: string): void {
    if (this.activeSpace === 1) this.funcSpace1 = func;
    if (this.activeSpace === 2) this.funcSpace2 = func;
    if (this.activeSpace === 3) this.funcSpace3 = func;

    this.addFunction = false;
    this.activeSpace = 0;
  }
  closeComponent(space: number): void {
    if (space === 1) this.funcSpace1 = 'none';
    if (space === 2) this.funcSpace2 = 'none';
    if (space === 3) this.funcSpace3 = 'none';
  }
}
