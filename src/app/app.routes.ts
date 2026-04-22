import { Routes } from '@angular/router';
import { DescktopComponent } from './components/descktop/descktop';
import { Error404Component } from './components/error404/error404';
import { Pomodoro } from './components/pomodoroFunciton/pomodoro/pomodoro';

export const routes: Routes = [
  {path: 'pomodoro', component : Pomodoro, title: 'Pomodoro'},
  {path: '', component: DescktopComponent, title: 'Descktop'},
    {path: '**', component: Error404Component, title: 'Error 404'}

];
