import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ServiceDescktop } from './service';
import { NgComponentOutlet } from '@angular/common';
import { Pomodoro } from '../pomodoroFunciton/pomodoro/pomodoro';
import { DetailChronometer } from '../chronometer/detail-chronometer/detail-chronometer';
import { SelctFunction } from '../common-components/selct-function/selct-function';
import { MatDialog } from '@angular/material/dialog';
import { COMPONENT_MAP } from '../../constants/map-components';
import { Observable } from 'rxjs';

@Component({
  selector: 'descktop',
  standalone: true,
  imports: [
    SelctFunction,
    Pomodoro,
    DetailChronometer,
    NgComponentOutlet
  ],
  
  templateUrl: './descktop.html',
  styleUrl: './descktop.css',
})
export class DescktopComponent {
  private service = inject(ServiceDescktop);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  addFunction: boolean = false;
  activeSpace: number = 0;

  funcSpace1: any | null = null;
  funcSpace2: any | null = null;
  funcSpace3: any | null = null;
  funcSpace4: any | null = null;
  funcSpace5: any | null = null;
  funcSpace6: any | null = null;
  funcSpace7: any | null = null;
  funcSpace8: any | null = null;
  funcSpace9: any | null = null;

  ngOnInit() {
    this.printDescktopConfig();
  }

  toggleFunction(space: number): void {
    this.addFunction = true;
    this.activeSpace = space;
  }

  functionSelected(func: any): void {
    console.log(func)
    this.service.getFunc(func.function, func.id).subscribe((res)=> {
      console.log(res)
    })
    // if (this.activeSpace === 1) this.funcSpace1 = func;
    // if (this.activeSpace === 2) this.funcSpace2 = func;
    // if (this.activeSpace === 3) this.funcSpace3 = func;

    // this.addFunction = false;
    // this.activeSpace = 0;
  }

  selectFunction(position: number) {
    const dialogRef =  this.dialog.open(SelctFunction,{
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.id && result.tasks){
        //es kanban
        (this as any)[`funcSpace${position}`] = {
          component: COMPONENT_MAP[result.function]
        };

        const componenteInfo = {
          component: result.function
        };
        localStorage.setItem(`funcSpace${position}`, JSON.stringify(componenteInfo));
        this.cdr.detectChanges();

      } else {
        this.service.getFunc(result.function, result.id).subscribe(()=> {
          (this as any)[`funcSpace${position}`] = {
            component: COMPONENT_MAP[result.function],
            inputs: { id: result.id }
          };

          const componenteInfo = {
            component: result.function,
            inputs: { id: result.id }
          };
          localStorage.setItem(`funcSpace${position}`, JSON.stringify(componenteInfo));
          this.cdr.detectChanges();
        })
      }
      
    })
  }

  emptySpace(space: number) {
    console.log(space);
    (this as any)[`funcSpace${space}`] = null;
    localStorage.removeItem(this.getSpace(space));
    this.cdr.detectChanges();
  }

  getSpace(numSpace: number) {
    return (this as any)[`funcSpace${numSpace}`];
  }

  private printDescktopConfig() {
    for (let i = 1; i <= 9; i++) {
      const dataString = localStorage.getItem(`funcSpace${i}`);
    
      if (dataString) {
        const data = JSON.parse(dataString);
        console.log(`Cargando espacio ${i}:`, data);
        // Reconstruimos el espacio usando el MAPA de componentes
        (this as any)[`funcSpace${i}`] = {
          component: COMPONENT_MAP[data.component], 
          inputs: data.inputs ? { id: data.inputs.id } : { }
        };
      }
    }
    this.cdr.detectChanges();
  }
}
