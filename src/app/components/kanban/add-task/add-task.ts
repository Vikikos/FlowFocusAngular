import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private dialogRef = inject(MatDialogRef);
  private formBuilder = inject(FormBuilder);

  taskForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    expiration_date: [null, [Validators.required]],
  })

  addTask(){
    if(this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  validateField(field: string): boolean {
    return (
      this.taskForm.controls[field].invalid &&
      this.taskForm.controls[field].touched
    );
  }
}
