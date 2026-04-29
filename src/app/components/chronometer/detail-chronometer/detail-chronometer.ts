import { Component, computed, inject, Input, signal } from '@angular/core';
import { ChronometerService } from '../service/chronometer-service';
import { IChronometer } from '../interfaces/chronometer';
import { BehaviorSubject, Observable, Subscription, } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'detail-chronometer',
  imports: [AsyncPipe],
  templateUrl: './detail-chronometer.html',
  styleUrls: ['./detail-chronometer.css','../../../../styles.css'],
})
export class DetailChronometer {
  private serviceChronometer = inject(ChronometerService);
  private intervalo: any;
  private modo = signal<string>('count_up');
  private segundosTotales = signal(0);

  @Input() idChoronometer!: number;

  chronometer$!: Observable<IChronometer>;
  chronometer!: IChronometer;
  corriendo = signal(false);

  ngOnInit(){
    this.chronometer$ = this.serviceChronometer.getChronometer(this.idChoronometer)

    this.chronometer$.subscribe((res)=> {
      this.chronometer = res;
      this.modo.set(this.chronometer.direction);
      //estado inicial
      this.segundosTotales.set(this.chronometer.duration);
    });
  }

  // El formateador se mantiene igual (es agnóstico a la dirección)
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
          // Si es cuenta regresiva, validamos que no sea menor a 0
          return actual > 0 ? actual - 1 : 0;
        }
      });

      // Opcional: Detener automáticamente si llega a cero en cuenta regresiva
      if (this.modo() === 'count_down' && this.segundosTotales() === 0) {
        this.pausar();
      }
    }, 1000);
  }

  // Métodos de apoyo
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

  ngOnDestroy() { this.pausar(); }

}
