import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { optionsValidator } from '../validators/validators';
import { ChronometerService } from '../service/chronometer-service';
import { IChronometer } from '../interfaces/chronometer';

@Component({
  selector: 'add-chronometer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-chronometer.html',
  styleUrls: ['./add-chronometer.css','../../../../styles.css'],
})
export class AddChronometer {
  private formBuilder = inject(FormBuilder);
  private chronometerService = inject(ChronometerService);
  @Output() added : EventEmitter<void> = new EventEmitter();

  chronometerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    duration: ['00:00:00', [Validators.required]],
    direction: ['Selecciona la Direccion', [Validators.required,optionsValidator(['count_up', 'count_down'])]]
  });
  
  addChronometer() {
    const formValue: IChronometer = {
      name: this.chronometerForm.controls['name'].value,
      duration: this.timeToSeconds(this.chronometerForm.controls['duration'].value),
      direction: this.chronometerForm.controls['direction'].value
    };

    this.chronometerService.addChronometer(formValue).subscribe({
      next: () =>{
        this.added.emit();
      },
      error: err => console.error('Error fatal:', err),
    })
  }

  validateField(field: string): boolean {
    return (
      this.chronometerForm.controls[field].invalid &&
      this.chronometerForm.controls[field].touched
    );
  }

  countUpMessage(): boolean {
    if(this.chronometerForm.controls['direction'].value === 'count_up')
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
