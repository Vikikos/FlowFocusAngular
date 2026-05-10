import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { optionsValidator } from '../validators/validators';
import { ICalendar } from '../interfaces/calendar';

@Component({
  selector: 'edit-calendar',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-calendar.html',
  styleUrl: './edit-calendar.css',
})
export class EditCalendar {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  public data: ICalendar = inject(MAT_DIALOG_DATA);

  calendarForm: FormGroup = this.formBuilder.group({
    name: [this.data.name,[Validators.required]],
    view_calendar: [this.data.view_calendar,[Validators.required,optionsValidator(['multiMonthYear','dayGridMonth','timeGridWeek','timeGridDay'])]]
  });

  editCalendar() {
    if (this.calendarForm.valid) {
      this.dialogRef.close(this.calendarForm.value);
    }
  }

  validateField(field: string): boolean {
    return (
      this.calendarForm.controls[field].invalid &&
      this.calendarForm.controls[field].touched
    );
  }
}
