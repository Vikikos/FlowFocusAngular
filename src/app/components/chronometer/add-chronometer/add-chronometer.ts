import { Component } from '@angular/core';

@Component({
  selector: 'add-chronometer',
  imports: [],
  templateUrl: './add-chronometer.html',
  styleUrls: ['./add-chronometer.css','../../../app.css'],
})
export class AddChronometer {
  validateField(field: string): boolean {
    return (true
      // this.userForm.controls[field].invalid &&
      // this.userForm.controls[field].touched
    );
  }
}
