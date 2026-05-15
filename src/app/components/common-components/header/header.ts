import { Component, EventEmitter, inject, Output } from '@angular/core';
import {RouterLink} from '@angular/router';
import { AuthService } from '../../auth/service/auth-service';
import { NavComponent } from '../nav/nav';

@Component({
  selector: 'header-component',
  imports: [RouterLink, NavComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.css', '../../../../styles.css'],
})
export class HeaderComponent {

  private authService = inject(AuthService);

  isLogged: boolean = false ;
  userName: string = '';

  ngOnInit() {
    this.isLogged =  this.authService.isLogged();
    this.userName = this.isLogged ? localStorage.getItem('USER_NAME')! : ''
  }

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  logOut() {
    this.logout.emit();
  }

}
