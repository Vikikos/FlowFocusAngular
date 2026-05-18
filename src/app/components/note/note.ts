import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { AddNote } from './add-note/add-note';
import { NoteService } from './service/note-service';
import { Observable } from 'rxjs';
import { INote } from './interfaces/note';
import { AsyncPipe, NgClass } from '@angular/common';
import { CardNote } from './card-note/card-note';
import { FormsModule } from '@angular/forms';
import { NoteFilterPipe } from '../../pipes/note-filter-pipe';

@Component({
  selector: 'note',
  imports: [
    AsideMenuComponent, 
    AddNote, 
    AsyncPipe, 
    CardNote,
    NgClass, 
    FormsModule,
    NoteFilterPipe
  ],
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class Note {
  notes$!: Observable<INote[]>;
  filterSearch: string = '';
  
  private serviceNote = inject(NoteService);

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notes$ = this.serviceNote.notes$;
    this.serviceNote.getNotes();
  }
}
