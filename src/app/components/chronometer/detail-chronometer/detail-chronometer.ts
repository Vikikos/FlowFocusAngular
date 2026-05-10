import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ChronometerService } from '../service/chronometer-service';
import { IChronometer } from '../interfaces/chronometer';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditChronometer } from '../edit-chronometer/edit-chronometer';

@Component({
  selector: 'detail-chronometer',
  imports: [AsyncPipe],
  templateUrl: './detail-chronometer.html',
  styleUrls: ['./detail-chronometer.css', '../../../../styles.css'],
})
export class DetailChronometer {
  private serviceChronometer = inject(ChronometerService);
  private dialog: MatDialog = inject(MatDialog);
  private intervalo: any;
  private modo = signal<string>('count_up');
  private segundosTotales = signal(0);

  @Input() idChoronometer!: number;
  @Output() updated: EventEmitter<void> = new EventEmitter<void>();

  chronometer$!: Observable<IChronometer>;
  chronometer!: IChronometer;
  corriendo = signal(false);

  ngOnInit() {
    this.chronometer$ = this.serviceChronometer.getChronometer(this.idChoronometer)

    this.chronometer$.subscribe((res) => {
      this.chronometer = res;
      this.modo.set(this.chronometer.direction);
      //estado inicial
      this.segundosTotales.set(this.chronometer.duration);
    });
  }

  tiempoDisplay = computed(() => {
    const total = this.segundosTotales();
    const horas = Math.floor(total / 3600);
    const minutos = Math.floor((total % 3600) / 60);
    const segundos = total % 60;
    return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
  });

  iniciar() {
    if (this.corriendo()) return;

    this.corriendo.set(true);
    this.intervalo = setInterval(() => {
      this.segundosTotales.update(actual => {
        if (this.modo() === 'count_up') {
          return actual + 1;
        } else {
          return actual > 0 ? actual - 1 : 0;
        }
      });

      if (this.modo() === 'count_down' && this.segundosTotales() === 0) {
        this.pausar();
      }
    }, 1000);
  }

  pausar() {
    this.corriendo.set(false);
    clearInterval(this.intervalo);
  }

  reiniciar() {
    this.pausar();
    if (this.chronometer) {
      //vuelve al valor inicial
      this.segundosTotales.set(this.chronometer.duration);
    }

  }

  private pad(number: number) {
    //para formatear el texto que se muestra
    return number.toString().padStart(2, '0');
  }

  editChronometer() {
    const dialogRef = this.dialog.open(EditChronometer, {
      width: '400px',
      disableClose: true,
      data: {...this.chronometer}
    });

    const formChronometer = {
      name: this.chronometer.name,
      duration: this.chronometer.duration,
      direction: this.chronometer.direction
    }
    dialogRef.afterClosed().subscribe(result => {

      if (JSON.stringify(result) !== JSON.stringify(formChronometer)) {
        //que cambie solo si son diferentes , algo ha cambiado
        this.serviceChronometer.updateChronometer(this.idChoronometer,result).subscribe({
          next: () => this.updated.emit(),
          error: (error) => console.log(error)
        });
      } 
    });
  }

  @Output() deleted : EventEmitter<void> = new EventEmitter<void>();

  deleteChronometer() {
    this.serviceChronometer.deleteChronometer(this.chronometer.id!).subscribe({
      next: () => this.deleted.emit(),
      error: (error) => console.log(error)
    })
    
  }

  ngOnDestroy() { this.pausar(); }

}
