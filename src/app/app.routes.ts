import { Routes } from '@angular/router';
import { DescktopComponent } from './components/descktop/descktop';
import { Error404Component } from './components/error404/error404';
import { Pomodoro } from './components/pomodoroFunciton/pomodoro/pomodoro';

export const routes: Routes = [
  {path: 'pomodoro', component : Pomodoro, title: 'Pomodoro'},
  {path: '', component: DescktopComponent, title: 'Descktop'},
    {path: '**', component: Error404Component, title: 'Error 404'}

];
    {
        path: '',
        canActivate: [isLoggedGuard],
        loadComponent: () =>
            import('./components/descktop/descktop')
                .then(m => m.DescktopComponent),
        title: 'Descktop'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./components/auth/login/login')
                .then(m => m.LoginComponent),
        title: 'Iniciar Sesion'
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./components/auth/signup/signup')
                .then(m => m.SignupComponent),
        title: 'Registrarse'
    },
    {
        path: 'profile',
        canActivate: [isLoggedGuard],
        loadComponent: () =>
            import('./components/auth/profile/profile')
                .then(m => m.ProfileComponent),
        title: 'Perfil'
    },
    {
        path: 'pomodoro',
        loadComponent: () =>
            import('./components/pomodoroFunciton/pomodoro/pomodoro')
                .then(m => m.Pomodoro),
        title: 'Pomodoro'},
    {
        path: '**',
        loadComponent: () =>
            import('./components/error404/error404')
                .then(m => m.Error404Component),
        title: 'Error 404'
    }
]
