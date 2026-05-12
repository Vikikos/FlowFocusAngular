import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { AddChronometer } from "./add-chronometer/add-chronometer";
import { DetailChronometer } from './detail-chronometer/detail-chronometer';
import { IChronometer } from './interfaces/chronometer';
import { Observable } from 'rxjs';
import { ChronometerService } from './service/chronometer-service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'chronometer',
  imports: [
    AsideMenuComponent,
    AddChronometer,
    DetailChronometer,
    AsyncPipe
],
  templateUrl: './chronometer.html',
  styleUrl: './chronometer.css',
})
export class Chronometer {
  private chronometerService = inject(ChronometerService);

  chronometers$!: Observable<IChronometer[]>;

  ngOnInit() {
    this.getChronometers();
  }

  addChronometer() {
    this.getChronometers();
  }

  getChronometers() {
    this.chronometers$ = this.chronometerService.getChronometers();
  }
}
