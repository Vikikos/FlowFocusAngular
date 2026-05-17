import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEvent } from '../../interfaces/calendar';

@Component({
  selector: 'edit-event',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css',
})
export class EditEvent {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  public data: IEvent = inject(MAT_DIALOG_DATA);
  public startHours = '00:00';
  public endHours = '00:00'
  public readonly date = this.data.start.split(' ')[0];

  ngOnInit() {
      this.startHours = this.data.start.split(' ')[1].substring(0, 5);
      this.endHours = this.data.end.split(' ')[1].substring(0, 5);
      this.formData.patchValue({
        start: this.startHours,
        end: this.endHours
      });
    
  }

  formData: FormGroup = this.formBuilder.group({
    title: [this.data.title, [Validators.required, Validators.minLength(3)]],
    date: [this.date , [Validators.required]],
    start: [this.startHours, [Validators.required]],
    end: [null],
    color: [this.data.color, [Validators.required]]
  });

  updateEvent() {
    if(this.formData.valid) {
      const event = {
        title: this.formData.controls['title'].value,
        start: `${this.formData.controls['date'].value} ${this.formData.controls['start'].value}:00`,
        end: `${this.formData.controls['date'].value} ${this.formData.controls['end'].value}:00`,
        color: this.formData.controls['color'].value,
      }
      this.dialogRef.close(event);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  validateField(field: string): boolean {
    return (
      this.formData.controls[field].invalid &&
      this.formData.controls[field].touched
    );
  }
}
