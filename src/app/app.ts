import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/common-components/header/header';
import { AsideMenuComponent } from "./components/common-components/aside-menu/aside-menu";
import { AuthService } from './components/auth/service/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideMenuComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLogged: boolean = false ;
  private authService = inject(AuthService);

  ngOnInit() {
    this.login();
  }

  login() {
    this.isLogged = this.authService.isLogged();
  }
}
