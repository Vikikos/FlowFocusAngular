import { Routes } from '@angular/router';
import { DescktopComponent } from './components/descktop/descktop';
import { Error404Component } from './components/error404/error404';
import { LoginComponent } from './components/auth/login/login';
import { SignupComponent } from './components/auth/signup/signup';
import { ProfileComponent } from './components/auth/profile/profile';

export const routes: Routes = [
    {path: '', component: DescktopComponent, title: 'Descktop'},

    {path: 'login', component: LoginComponent, title: 'Iniciar Sesion'},
    {path: 'signup', component: SignupComponent, title: 'Registrarse'},
    {path: 'profile', component: ProfileComponent, title: 'Perfil'},

    {path: '**', component: Error404Component, title: 'Error 404'}
];
