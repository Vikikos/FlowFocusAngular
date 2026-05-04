import { Component, inject, Input } from '@angular/core';
import { ICalendar } from '../../interfaces/calendar';
import { Observable } from 'rxjs';
import { CalendarService } from '../../service/calendar-service';

@Component({
  selector: 'card-calendar',
  imports: [],
  templateUrl: './card-calendar.html',
  styleUrl: './card-calendar.css',
})
export class CardCalendar {
  private calendarService = inject(CalendarService);
  @Input() idCalendar!: number;

  calendar$!: Observable<ICalendar> ;
  ngOnInit() {
    
  }
  deleteCalendar() {}
  editCalendar() {}
}
