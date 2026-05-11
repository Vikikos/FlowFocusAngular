import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { ICalendar } from '../../interfaces/calendar';
import { Observable } from 'rxjs';
import { CalendarService } from '../../service/calendar-service';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditCalendar } from '../../edit-calendar/edit-calendar';


@Component({
  selector: 'card-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './card-calendar.html',
  styleUrl: './card-calendar.css',
})
export class CardCalendar {
  private calendarService = inject(CalendarService);
  private route = inject(Router);
  private dialog: MatDialog = inject(MatDialog);
  @Input() idCalendar!: number;
  @Output() deleted : EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<void> = new EventEmitter<void>();

  public VIEWS: Record<string, string> = {
    multiMonthYear: 'anual',
    dayGridMonth: 'mensual',
    timeGridWeek: 'semanal',
    timeGridDay: 'diaria'
  };

  calendar$!: Observable<ICalendar> ;
  ngOnInit() {
    this.calendar$ = this.calendarService.getCalendar(this.idCalendar);
  }
  showCalendar(id: number){
    this.route.navigate([`calendar/${id}`]);
  }
  deleteCalendar() {
    this.calendarService.deleteCalendar(this.idCalendar).subscribe({
      next: () => this.deleted.emit(this.idCalendar),
      error: (error) => console.log(error)
    })
  }
  editCalendar(calendar: ICalendar) {
    const formCalendar: ICalendar = {
      name: calendar.name,
      view_calendar: calendar.view_calendar
    }
    const dialogRef = this.dialog.open(EditCalendar, {
      width: '400px',
      disableClose: true,
      data: {...formCalendar}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      console.log(result)
      console.log(formCalendar)
      if (JSON.stringify(result) !== JSON.stringify(formCalendar)) {
        this.calendarService.updateCalendar(this.idCalendar, result).subscribe({
          next: () => this.deleted.emit(),
          error: (error) => console.log(error)
        })
      }
    })
  }
}
