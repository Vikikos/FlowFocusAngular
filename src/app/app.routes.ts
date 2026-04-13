import { Routes } from '@angular/router';
import { DescktopComponent } from './components/descktop/descktop';
import { Error404Component } from './components/error404/error404';

export const routes: Routes = [
    {path: '', component: DescktopComponent, title: 'Descktop'},
    {path: '**', component: Error404Component, title: 'Error 404'}
];
