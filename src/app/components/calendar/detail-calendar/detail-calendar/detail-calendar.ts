import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import { CalendarService } from '../../service/calendar-service';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventFormModal } from '../../event/event-form-modal/event-form-modal';
import { AsideMenuComponent } from "../../../common-components/aside-menu/aside-menu";
import { ICalendar, IEvent } from '../../interfaces/calendar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { DetailEvent } from "../../event/detail-event/detail-event";

@Component({
  selector: 'detail-calendar',
  imports: [CommonModule, FullCalendarModule, AsideMenuComponent, RouterLink, DetailEvent],
  templateUrl: './detail-calendar.html',
  styleUrl: './detail-calendar.css',
})
export class DetailCalendar {
  private calendarService = inject(CalendarService);
  private dialog: MatDialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private idCalendar: string = this.route.snapshot.paramMap.get('id')!;
  idEvent= signal<number>(0);
  calendar = signal<ICalendar | null>(null);
  calendarOptions: CalendarOptions | null = null;

  events = signal<EventInput[]>([]);

  ngOnInit() {
    this.calendarOptions = null;
    this.calendar.set(null);

    this.calendarService.getCalendar(this.idCalendar).subscribe({
      next: (data) => {
        this.calendar.set(data);
        this.calendarOptions = this.buildCalendar(data);
      },
      error: (err) => console.error('Error cargando calendario', err)
    })
  }

  getEvents() {
    this.calendarService.getEvents(this.idCalendar).subscribe({
      next: (data) =>{
        
        if(data.length > 0){
          this.events.set([]);
          this.events.set(data); 
          this.idEvent.set(data[0].id);
        }
       
      },
      error: (error) => console.log(error)
    })
  }

  buildCalendar(calendar: ICalendar): CalendarOptions {
    this.calendarOptions = null;
    this.getEvents();
    return {
      initialView: calendar.view_calendar,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin,multiMonthPlugin],
      locale: 'es',
      headerToolbar: {
        start: 'title',
        center: '',
        end: 'prev,next'
      },
      firstDay: 1,
      selectable: true,
      editable: true,
      height: '700px',
      events: this.events(),
      fixedWeekCount: false,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      allDaySlot: false,
      dateClick: (arg) => this.handleDateClick(arg),
      eventClick: (arg) => this.showEvent(arg)
    };
  }


  showEvent(arg: any) {
    const id = Number(arg.event.id);
    this.idEvent.set(id);
  }

  handleDateClick(arg: any) {
    const dialogRef = this.dialog.open(EventFormModal, {
      width: '400px',
      data: arg
    });
    dialogRef.afterClosed().subscribe(event => {
      if (event) {
        this.calendarService.addEvent(event, this.idCalendar).subscribe({
          next: () => {
            this.events.update(eventos => [
              ...eventos,
              { ...event }
            ]);
          },
          error: (error) => console.log(error)
        })
      }
    });
  }
}
