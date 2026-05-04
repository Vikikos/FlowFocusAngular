import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PomodoroService } from '../services/pomodoroService';
import { IPomodoro } from '../interfaces/ipomodoro';
import { AsideMenuComponent } from '../../common-components/aside-menu/aside-menu';

@Component({
  selector: 'app-pomodoro-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,AsideMenuComponent],
  templateUrl: './pomodoro-manager.html',
  styleUrl: './pomodoro-manager.css'
})
export class PomodoroManager implements OnInit {
  // Lista de todos los pomodoros
  allSettings: IPomodoro[] = [];

  // Control de interfaz
  showAddForm: boolean = false;
  isLoading: boolean = false;

  // Modelo para el nuevo pomodoro (en minutos para el usuario)
  newPomodoro = {
    predetermined: '',
    work_duration: 25,
    break_duration: 5,
    total_sessions: 4
  };

  constructor(
    private pomodoroService: PomodoroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  /**
   * Carga la lista completa desde Laravel
   */
  loadAll(): void {
    this.isLoading = true;
    this.pomodoroService.getSettings().subscribe({
      next: (data) => {
        this.allSettings = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando settings:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Envía el nuevo Pomodoro a la API
   */
  createPomodoro(): void {
    if (!this.newPomodoro.predetermined.trim()) {
      alert('Por favor, ponle un nombre a la configuración');
      return;
    }

    // Convertimos los minutos del formulario a segundos para la base de datos
    const payload = {
      predetermined: this.newPomodoro.predetermined,
      work_duration: this.newPomodoro.work_duration * 60,
      break_duration: this.newPomodoro.break_duration * 60,
      total_sessions: this.newPomodoro.total_sessions
    };

    this.pomodoroService.create(payload).subscribe({
      next: (res) => {
        // Añadimos el nuevo a la lista local o recargamos
        this.allSettings.push(res);
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al crear:', err)
    });
  }

  /**
   * Borra un registro por ID
   */
  deletePomodoro(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta configuración?')) {
      this.pomodoroService.delete(id).subscribe({
        next: () => {
          // Filtramos la lista local para quitar el borrado
          this.allSettings = this.allSettings.filter(item => item.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al borrar:', err)
      });
    }
  }

  /**
   * Helpers de UI
   */
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  private resetForm(): void {
    this.newPomodoro = {
      predetermined: '',
      work_duration: 25,
      break_duration: 5,
      total_sessions: 4
    };
    this.showAddForm = false;
  }
}
