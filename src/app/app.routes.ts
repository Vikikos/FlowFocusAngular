import { Routes } from '@angular/router';
import { isLoggedGuard } from './guards/is-logged-guard';

export const routes: Routes = [
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
        canActivate: [isLoggedGuard],
        loadComponent: () =>
            import('./components/pomodoroFunciton/pomodoro/pomodoro')
                .then(m => m.Pomodoro),
        title: 'Pomodoro'
    },
    {
        path: 'chronometer',
        canActivate: [isLoggedGuard],
        loadComponent: () =>
            import('./components/chronometer/chronometer')
            .then(m => m.Chronometer)
        ,
        title: 'Chronometer'
    },
    {
        path: 'calendar',
        canActivate: [isLoggedGuard],
        loadComponent: () =>
            import('./components/calendar/calendar')
            .then(m => m.Calendar)
        ,
        title: 'Chronometer'
    },
    {
        path: '**',
        loadComponent: () =>
            import('./components/error404/error404')
                .then(m => m.Error404Component),
        title: 'Error 404'
    }
]
