import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CalendarService } from '../service/calendar-service';
import { ICalendar } from '../interfaces/calendar';

import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { EventFormModal } from '../event/event-form-modal/event-form-modal';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DetailCardEvent } from './detail-card-event/detail-card-event';

@Component({
  selector: 'card-desktop-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './card-desktop-calendar.html',
  styleUrl: './card-desktop-calendar.css',
})
export class CardDesktopCalendar {
  private calendarService = inject(CalendarService);
  private dialog: MatDialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  idEvent= signal<number>(0);
  calendar = signal<ICalendar | null>(null);
  calendarOptions: CalendarOptions | null = null;

  events = signal<EventInput[]>([]);
  @Input() id!: number;

  ngOnInit() {
    this.calendarOptions = null;
    this.calendar.set(null);

    this.calendarService.getCalendar(this.id).subscribe({
      next: (data) => {
        this.calendar.set(data);
        this.calendarOptions = this.buildCalendar(data);
      },
      error: (err) => console.error('Error cargando calendario', err)
    })
  }

  getEvents() {
    this.calendarService.getEvents(this.id).subscribe({
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
      height: '300px',
      events: this.events(),
      fixedWeekCount: true,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      dayHeaderFormat: { weekday: 'narrow' },
      allDaySlot: false,
      dateClick: (arg) => this.handleDateClick(arg),
      eventClick: (arg) => this.showEvent(arg)
    };
  }

  showEvent(arg: any) {
    const dialogRef = this.dialog.open(DetailCardEvent, {
      width: '400px',
      data: {
        idEvent: arg.event._def.publicId,
        idcalendar: this.id,
      }
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result && result.action === 'delete') {
    //     const eventId = arg.event.id || arg.event._def.publicId;
    //       this.calendarService.deleteEvent(eventId, this.id).subscribe({
    //         next: () => {
    //           this.events.update(eventos => 
    //             eventos.filter(e => String(e.id) !== String(eventId))
    //           );
    //           this.getEvents();
    //         },
    //         error: (error) => console.error('Error al borrar:', error)
    //       });
    //     }  
    // });
  }

  handleDateClick(arg: any) {
      const dialogRef = this.dialog.open(EventFormModal, {
        width: '400px',
        data: arg
      });
      dialogRef.afterClosed().subscribe(event => {
        if (event) {
          this.calendarService.addEvent(event, this.id).subscribe({
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
  
  @Input() onEmptyAction?: () => void;
  notifyClose() {
    if (this.onEmptyAction) {
      this.onEmptyAction();
    }
  }
}
