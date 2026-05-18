import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'event-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './event-form-modal.html',
  styleUrl: './event-form-modal.css',
})
export class EventFormModal {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public hours = '00:00';
  public readonly day = this.data.dateStr.split('T')[0];

  ngOnInit() {
    if(this.data.view.type != 'multiMonthYear' && this.data.view.type != 'dayGridMonth'){
      this.hours = this.data.dateStr.split('T')[1].substring(0, 5);
      this.formData.patchValue({
        start: this.hours
      });
    }
  }

  formData: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required, Validators.minLength(3)]],
    date: [this.day, [Validators.required]],
    start: [this.hours, [Validators.required]],
    end: [null],
    color: ['Elige color', [Validators.required]]
  });

  addEvent() {
    if(this.formData.valid){
      const event = {
        title: this.formData.controls['title'].value,
        start: `${this.formData.controls['date'].value} ${this.formData.controls['start'].value}`,
        end: `${this.formData.controls['date'].value} ${this.formData.controls['end'].value}`,
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
