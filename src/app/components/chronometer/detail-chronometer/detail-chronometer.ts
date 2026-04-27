import { Component, inject } from '@angular/core';
import { ChronometerService } from '../service/chronometer-service';
import { IChronometer } from '../interfaces/chronometer';

@Component({
  selector: 'detail-chronometer',
  imports: [],
  templateUrl: './detail-chronometer.html',
  styleUrls: ['./detail-chronometer.css','../../../../styles.css'],
})
export class DetailChronometer {
  private serviceChronometer = inject(ChronometerService);
  chronometer!: IChronometer ;

  ngOnInit(){
    this.serviceChronometer.getChronometer(1).subscribe(data => {
      this.chronometer = data;
    });
  }
}
