import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../auth/service/auth-service';
import { NavComponent } from "../nav/nav";

@Component({
  selector: 'aside-menu-component',
  imports: [
    RouterLink,
    NavComponent
],
  templateUrl: './aside-menu.html',
  styleUrl: './aside-menu.css',
})
export class AsideMenuComponent {

}
