import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PomodoroService } from '../services/pomodoroService';
import { IPomodoro } from '../interfaces/ipomodoro';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pomodoro-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pomodoro-manager.html',
  styleUrl: './pomodoro-manager.css'
})
export class PomodoroManager implements OnInit {
  allSettings: IPomodoro[] = [];

  showAddForm: boolean = false;
  isLoading: boolean = false;

  newPomodoro = {
    predetermined: '',
    work_duration: 25,
    break_duration: 5,
    total_sessions: 4
  };

  private pomodoroService = inject(PomodoroService);
  private settingsSubscription?: Subscription;

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.settingsSubscription = this.pomodoroService.settings$.subscribe(data => {
      this.allSettings = data;
      this.isLoading = false;
    });
    this.pomodoroService.getSettings();
  }

  createPomodoro(): void {
    if (!this.newPomodoro.predetermined.trim()) {
      
      return;
    }

    const payload = {
      predetermined: this.newPomodoro.predetermined,
      work_duration: this.newPomodoro.work_duration * 60,
      break_duration: this.newPomodoro.break_duration * 60,
      total_sessions: this.newPomodoro.total_sessions
    };

    this.pomodoroService.create(payload).subscribe({
      next: () => {
        this.resetForm();
        this.pomodoroService.getSettings();
      },
      error: (err) => console.error('Error al crear:', err)
    });
  }

  deletePomodoro(id: number): void {
      this.pomodoroService.delete(id).subscribe({
        next: () => {
          this.pomodoroService.getSettings();
        },
        error: (err) => console.error('Error al borrar:', err)
      });

  }

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

  ngOnDestroy(): void {
    this.settingsSubscription?.unsubscribe();
  }
}
