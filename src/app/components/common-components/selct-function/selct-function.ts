import { Component, inject,  } from '@angular/core';
import { NoteService } from '../../note/service/note-service';
import { INote } from '../../note/interfaces/note';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CalendarService } from '../../calendar/service/calendar-service';
import { ICalendar } from '../../calendar/interfaces/calendar';
import { MatDialogRef } from '@angular/material/dialog';
import { IChronometer } from '../../chronometer/interfaces/chronometer';
import { ChronometerService } from '../../chronometer/service/chronometer-service';

@Component({
  selector: 'selct-function',
  imports: [AsyncPipe],
  templateUrl: './selct-function.html',
  styleUrl: './selct-function.css',
})
export class SelctFunction {
  private notesService = inject(NoteService);
  private calendarService = inject(CalendarService);
  private chronometerService = inject(ChronometerService);

  private dialogRef = inject(MatDialogRef);

  navItems: any[] = [];
  notes$!: Observable<INote[]>;
  calendars$!: Observable<ICalendar[]>;
  chronometers$!: Observable<IChronometer[]>;

  ngOnInit() {
    this.notes$ = this.notesService.notes$;
    this.notesService.getNotes();

    this.calendars$ = this.calendarService.calendars$;
    this.calendarService.getCalendars();

    this.chronometers$ = this.chronometerService.chronometers$;
    this.chronometerService.getChronometers();

    this.navItems = [
      { 
        title: 'Pomodoro', 
        db_name: 'pomodoro', 
        route: '/home' 
      },
      {
        title: 'Notas',
        db_name: 'marks',
        showSubMenu: false,
        subMenu: this.notes$
      },
      { 
        title: 'Calendarios', 
        db_name: 'calendars',
        showSubMenu: false,
        subMenu: this.calendars$
      },
      { 
        title: 'Cronometros', 
        db_name: 'chronometers',
        showSubMenu: false,
        subMenu: this.chronometers$
      },
      {
        title: 'Kanban',
        db_name: 'kanban',
      }
    ];

  }

  sendFunciton(func :string, id?: number ): void{
    let send = {};
    if(!id){
      send = {
        function: func,
        tasks: true
      }
    } else{
      send = {
        function: func,
        id: id
      }
    }

    this.dialogRef.close(send);
  }

  toggleSubMenu(item: any) {
    if (item.subMenu) {
      item.showSubMenu = !item.showSubMenu;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

