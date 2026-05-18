import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { PomodoroService } from '../services/pomodoroService';
import { IPomodoro } from '../interfaces/ipomodoro';
import { AsideMenuComponent } from '../../common-components/aside-menu/aside-menu';
import { DecimalPipe } from "@angular/common";
import { Subscription } from 'rxjs';
@Component({
  selector: 'pomodoro',
  imports: [DecimalPipe, AsideMenuComponent  ],
  templateUrl: './pomodoro.html',
  styleUrl: './pomodoro.css',
})
export class Pomodoro implements OnInit, OnDestroy {

  @Output() close = new EventEmitter<void>();

  setting?: IPomodoro;
  allSettings: IPomodoro[] = [];
  secondLeft: number= 0;
  isRunning:boolean =false;
  isWorking:boolean =true;
  isEditing:boolean=false
  showMenu:boolean=false;
  currentSession:number=1;
  timerInterval:any;

  private audio = new Audio();
  private pomodoroService = inject(PomodoroService);
  private cdr = inject(ChangeDetectorRef);
  private settingsSubscription?: Subscription;

  protected readonly Math =Math;

  constructor() {
    this.audio.src = 'sounds/alarma.mp3';
    this.audio.load();
  }

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.settingsSubscription = this.pomodoroService.settings$.subscribe(data => {
      if (data && data.length > 0) {
        this.allSettings = data;
        if (!this.setting || !data.find(s => s.id === this.setting!.id)) {
          this.setting = data[0];
        }
        this.resetTimer();
        this.cdr.detectChanges();
      }
    });
    this.pomodoroService.getSettings();
  }

  resetTimer(): void {
    this.stop();
    if (this.setting) {
      const seconds = this.isWorking ? this.setting.work_duration : this.setting.break_duration;
      this.secondLeft = Number(seconds);
      this.cdr.detectChanges();
    }
  }

  toggle(): void {

    if (!this.isRunning) {
      this.audio.play().then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
      }).catch(() => {});
    }

    this.isRunning ? this.stop() : this.start();
  }
  start(): void {
    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.secondLeft > 0) {
        this.secondLeft--;
        this.cdr.detectChanges();
      } else {
        this.handlePhaseEnd();
      }
    }, 1000);
  }

  private playSound(): void {
    this.audio.currentTime = 0;
    this.audio.play().catch(err => console.error("Error al sonar:", err));
  }

  stop(): void {
    this.isRunning = false;
    this.cdr.detectChanges();
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  handlePhaseEnd(): void {
    this.stop();
    this.playSound();
    if(this.isWorking){
      this.isWorking=false;

    }else{
      this.isWorking = true;
      this.currentSession++;

    }

    if(this.currentSession<=(this.setting?.total_sessions || 0)){
      this.resetTimer();
      this.start();
    }else{
      this.currentSession=1;
      this.isWorking = true;
      this.resetTimer();
    }
    this.cdr.detectChanges();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isRunning) this.stop();
  }

saveSettings(newWork: string, newBreak: string, newSessions: string): void {
  if (!this.setting || !this.setting.id) return;

  const dataToSend: IPomodoro = {
    ...this.setting,
    work_duration: Number(newWork) * 60,
    break_duration: Number(newBreak) * 60,
    total_sessions: Number(newSessions)
  };

  this.pomodoroService.updateSettings(this.setting.id, dataToSend).subscribe({
    next: (response) => {

      this.setting = response.data;

      this.isEditing = false;
      this.isWorking = true;
      this.currentSession = 1;

      this.stop();
      this.resetTimer();
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Error al guardar:', err)
  });
}

selectPomodoro(item: IPomodoro): void {
    this.setting = item;
    this.isWorking = true;
    this.currentSession = 1;
    this.showMenu = false;
    this.resetTimer();
    this.cdr.detectChanges();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }


  ngOnDestroy():void{
    this.stop();
    this.settingsSubscription?.unsubscribe();
  }
  isClosing = false;

  sendClose(): void {
    this.isClosing = true;

    setTimeout(() => {
      this.stop();
      this.close.emit();
    }, 400);
  }

}
