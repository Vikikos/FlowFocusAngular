import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { optionsValidator } from './validators';

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

  chronometerForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    duration: ['00:00:00', [Validators.required,Validators.min(1)]],
    direction: ['Selecciona la Direccion', [Validators.required,optionsValidator(['count_up', 'count_down'])]]
  });
  
  addChronometer() {

  }

  validateField(field: string): boolean {
    return (
      this.chronometerForm.controls[field].invalid &&
      this.chronometerForm.controls[field].touched
    );
  }
}
