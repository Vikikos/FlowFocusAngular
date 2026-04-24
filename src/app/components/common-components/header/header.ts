import { Component, inject } from '@angular/core';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../auth/service/auth-service';
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'header-component',
  imports: [RouterLink, NavComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  private authService = inject(AuthService);

  isLogged: boolean = false ;
  userName: string = '';

  ngOnInit() {
    this.isLogged =  this.authService.isLogged();
    this.userName = this.isLogged ? localStorage.getItem('USER_NAME')! : ''
  }

}
