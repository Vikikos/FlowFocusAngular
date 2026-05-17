import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NoteService } from '../service/note-service';
import { INote } from '../interfaces/note';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'card-note',
  imports: [AsyncPipe],
  templateUrl: './card-note.html',
  styleUrl: './card-note.css',
})
export class CardNote {
  @Input() id!: number;
  private serviceNote = inject(NoteService);
  note$!: Observable<INote>;

  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.note$ = this.serviceNote.getNote(this.id);
  }
  deleteNote() {
    this.serviceNote.deleteNote(this.id).subscribe({
      next: () => this.deleted.emit(),
      error: (error) => console.log(error)
    })
  }
}
