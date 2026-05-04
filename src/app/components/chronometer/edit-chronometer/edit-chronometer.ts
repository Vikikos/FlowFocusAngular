import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChronometerService } from '../service/chronometer-service';
import { optionsValidator } from '../validators/validators';
import { IChronometer } from '../interfaces/chronometer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-chronometer',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-chronometer.html',
  styleUrls: ['./edit-chronometer.css', '../../../../styles.css'],
})
export class EditChronometer {
  private formBuilder = inject(FormBuilder);
  public chronometerData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);
  @Output() added: EventEmitter<void> = new EventEmitter();

  chronometerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    duration: ['00:00:00', [Validators.required]],
    direction: ['Selecciona la Direccion', [Validators.required, optionsValidator(['count_up', 'count_down'])]]
  });

  ngOnInit() {
    if (this.chronometerData) {
      this.chronometerData.duration = this.formatTime(this.chronometerData.duration);
      this.chronometerForm.patchValue(this.chronometerData);
    }
  }
  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Usamos padStart para asegurar que siempre haya 2 dígitos
    const hDisplay = hours.toString().padStart(2, '0');
    const mDisplay = minutes.toString().padStart(2, '0');
    const sDisplay = seconds.toString().padStart(2, '0');

    return `${hDisplay}:${mDisplay}:${sDisplay}`;
  }

  addChronometer() {
    if (this.chronometerForm.valid) {
      // Cerramos pasando los datos del formulario
      const formValue = this.buildChronometerForm();
      this.dialogRef.close(formValue);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private buildChronometerForm() {
    return {
        name: this.chronometerForm.controls['name'].value,
        duration: this.timeToSeconds(this.chronometerForm.controls['duration'].value),
        direction: this.chronometerForm.controls['direction'].value
      };
  }

  validateField(field: string): boolean {
    return (
      this.chronometerForm.controls[field].invalid &&
      this.chronometerForm.controls[field].touched
    );
  }

  countUpMessage(): boolean {
    if (this.chronometerForm.controls['direction'].value === 'count_up')
      this.chronometerForm.get('duration')?.disable();
    else
      this.chronometerForm.get('duration')?.enable();

    return (
      this.chronometerForm.controls['direction'].value === 'count_up'
    )
  }

  timeToSeconds(time: string): number {
    const parts = time.split(':');

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    return (hours * 3600) + (minutes * 60) + seconds;
  }
}
