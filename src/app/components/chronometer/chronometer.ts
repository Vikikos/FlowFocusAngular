import { Component } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { AddChronometer } from "./add-chronometer/add-chronometer";
import { DetailChronometer } from './detail-chronometer/detail-chronometer';
@Component({
  selector: 'chronometer',
  imports: [
    AsideMenuComponent,
    AddChronometer,
    DetailChronometer
],
  templateUrl: './chronometer.html',
  styleUrl: './chronometer.css',
})
export class Chronometer {

}
