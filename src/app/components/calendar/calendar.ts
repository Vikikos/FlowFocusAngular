import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { AddCalendar } from './add-calendar/add-calendar';
import { CalendarService } from './service/calendar-service';
import { Observable } from 'rxjs';
import { ICalendar } from './interfaces/calendar';
import { AsyncPipe } from '@angular/common';
import { CardCalendar } from "./detail-calendar/card-calendar/card-calendar";

@Component({
  selector: 'calendar',
  imports: [
    AsideMenuComponent,
    AddCalendar,
    AsyncPipe,
    CardCalendar
],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  private calendarService = inject(CalendarService);

  calendars$! : Observable<ICalendar[]>;

  ngOnInit() {
    this.getCalendars();
  }

  addCalendar() {}

  getCalendars() {
    this.calendars$ = this.calendarService.getCalendars();
  }
}
