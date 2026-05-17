import { Component, inject, Input } from '@angular/core';
import { NoteService } from '../service/note-service';
import { INote } from '../interfaces/note';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'card-desktop-note',
  imports: [AsyncPipe],
  templateUrl: './card-desktop-note.html',
  styleUrl: './card-desktop-note.css',
})
export class CardDesktopNote {
  @Input() id!: number;
  private serviceNote = inject(NoteService);
  note$!: Observable<INote>;

  ngOnInit() {
    this.note$ = this.serviceNote.getNote(this.id);
  }

  @Input() onEmptyAction?: () => void;
  notifyClose() {
    if (this.onEmptyAction) {
      this.onEmptyAction();
    }
  }
}
