import { Component, inject } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { AddNote } from './add-note/add-note';
import { NoteService } from './service/note-service';
import { Observable } from 'rxjs';
import { INote } from './interfaces/note';
import { AsyncPipe } from '@angular/common';
import { CardNote } from './card-note/card-note';

@Component({
  selector: 'note',
  imports: [AsideMenuComponent, AddNote, AsyncPipe, CardNote],
  templateUrl: './note.html',
  styleUrl: './note.css',
})
export class Note {
  private serviceNote = inject(NoteService);
  notes$!: Observable<INote[]>;

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notes$ = this.serviceNote.getNotes();
  }
}
