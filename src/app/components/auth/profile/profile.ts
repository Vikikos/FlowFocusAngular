import { Component } from '@angular/core';
import { AsideMenuComponent } from '../../common-components/aside-menu/aside-menu';
import { RouterLink } from "@angular/router";
import { IUser } from '../interfaces/user';
import { AuthService } from '../service/auth-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'profile-component',
  imports: [AsideMenuComponent, RouterLink,AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  user$!: Observable<IUser>;

  constructor(
    private authService: AuthService
  ) {
   
  }

  ngOnInit() {
    this.user$ = this.authService.getUserData();
  }
}
