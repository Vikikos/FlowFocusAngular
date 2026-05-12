import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../service/note-service';

@Component({
  selector: 'add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.html',
  styleUrl: './add-note.css',
})
export class AddNote {
  private formBuilder = inject(FormBuilder);
  private serviceNote = inject(NoteService);

  @Output() added : EventEmitter<void> = new EventEmitter();

  noteForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required,Validators.maxLength(255)]]
  })

  addNote() {
    if(this.noteForm.valid){
      this.serviceNote.addNote(this.noteForm.value).subscribe({
        next: () => this.added.emit(),
        error: (error) => console.log(error)
      });
    }
  }

  validateField(field: string): boolean {
    return (
      this.noteForm.controls[field].invalid &&
      this.noteForm.controls[field].touched
    );
  }
}
