import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarService } from '../service/calendar-service';
import { optionsValidator } from '../validators/validators';
import { ICalendar } from '../interfaces/calendar';

@Component({
  selector: 'add-calendar',
  imports: [ReactiveFormsModule],
  templateUrl: './add-calendar.html',
  styleUrls: ['./add-calendar.css','../../../../styles.css'],
})
export class AddCalendar {
  private formBuilder = inject(FormBuilder);
  private calendarService = inject(CalendarService);
  @Output() added : EventEmitter<void> = new EventEmitter();

  calendarForm: FormGroup = this.formBuilder.group({
    name: [null,[Validators.required]],
    view: ['Selecciona un tipo de vista',[Validators.required,optionsValidator(['year','month','week','day'])]]
  });

  addCalendar() {
    const formValue: ICalendar = {
      name: this.calendarForm.controls['name'].value,
      view: this.calendarForm.controls['view'].value
    };
  }

  validateField(field: string): boolean {
    return (
      this.calendarForm.controls[field].invalid &&
      this.calendarForm.controls[field].touched
    );
  }
}
