import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { CalendarService } from '../../service/calendar-service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { IEvent } from '../../interfaces/calendar';
import { EditEvent } from '../../event/edit-event/edit-event';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'detail-card-event',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './detail-card-event.html',
  styleUrl: './detail-card-event.css',
})
export class DetailCardEvent {
  private serviceCalendar = inject(CalendarService);
  private dialog = inject(MatDialog);
  private dialogRef = inject(DialogRef);
  private data = inject(MAT_DIALOG_DATA);

  idEvent!: string;
  idCalendar!: number;

  event$!: Observable<IEvent>;

  @Output() updated: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleted : EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.idEvent = this.data.idEvent;
    this.idCalendar = this.data.idcalendar;

    this.event$ = this.getEvent();
  }

  getEvent() {
    return this.serviceCalendar.getEvent(this.idEvent,this.idCalendar);
  }

  getDuration(event: IEvent) {
    const duration = new Date(event.end).getTime() - new Date(event.start).getTime() ;
    return duration;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  // editEvent(event: IEvent) {
  //   const eventEdit = {
  //     title: event.title,
  //     start: event.start,
  //     end: event.end,
  //     color: event.color
  //   };
  //   const dialogRef = this.dialog.open(EditEvent, {
  //     width: '400px',
  //     disableClose: true,
  //     data: {...eventEdit}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!result) return;

  //     if(JSON.stringify(result) !== JSON.stringify(eventEdit)) {
  //       this.serviceCalendar.updateEvent(result,this.idEvent, this.idCalendar).subscribe({
  //         next: () => {
  //           this.updated.emit();
  //           this.event$ = this.getEvent();
  //           this.dialogRef.close({ edited: true });
  //         },
  //         error: (error) => console.log(error)
  //       })
  //     }
  //   })
  // }
  // deleteEvent() {
  //   this.serviceCalendar.deleteEvent(this.idEvent, this.idCalendar).subscribe({
  //     next: () => this.dialogRef.close({ action: 'delete' }),
  //     error: (error) => console.log(error)
  //   })
  // }
}
