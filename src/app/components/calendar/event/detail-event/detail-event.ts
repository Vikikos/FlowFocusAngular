import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '../../service/calendar-service';
import { IEvent } from '../../interfaces/calendar';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EditEvent } from '../edit-event/edit-event';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'detail-event',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './detail-event.html',
  styleUrl: './detail-event.css',
})
export class DetailEvent {
  private serviceCalendar = inject(CalendarService);
  private dialog = inject(MatDialog);

  idEvent = input.required<number | string>();
  idCalendar = input.required<number | string>();

  @Output() updated: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleted : EventEmitter<void> = new EventEmitter<void>();

  public event$ = toObservable(this.idEvent).pipe(
    switchMap(id => this.serviceCalendar.getEvent(id, this.idCalendar()))
  );

  getEvent() {
    return this.serviceCalendar.getEvent(this.idEvent(),this.idCalendar());
  }

  getDuration(event: IEvent) {
    const duration = new Date(event.end).getTime() - new Date(event.start).getTime() ;
    return duration;
  }

  editEvent(event: IEvent) {
    const eventEdit = {
      title: event.title,
      start: event.start,
      end: event.end,
      color: event.color
    };
    const dialogRef = this.dialog.open(EditEvent, {
      width: '400px',
      disableClose: true,
      data: {...eventEdit}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      if(JSON.stringify(result) !== JSON.stringify(eventEdit)) {
        this.serviceCalendar.updateEvent(result,this.idEvent(), this.idCalendar()).subscribe({
          next: () => {
            this.updated.emit();
            this.event$ = this.getEvent();
          },
          error: (error) => console.log(error)
        })
      }
    })
  }
  deleteEvent() {
    this.serviceCalendar.deleteEvent(this.idEvent(), this.idCalendar()).subscribe({
      next: () => this.deleted.emit(),
      error: (error) => console.log(error)
    })
  }
}
