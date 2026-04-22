import { Component } from '@angular/core';
import { AsideMenuComponent } from '../../common-components/aside-menu/aside-menu';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'profile-component',
  imports: [AsideMenuComponent, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {

}
