import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../auth/service/auth-service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ThemeDialog } from '../theme-dialog/theme-dialog';

@Component({
  selector: 'nav-componet',
  imports: [RouterLink,MatTooltipModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  isLogged: boolean = false ;
  userName: string = '';
  
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  ngOnInit() {
    this.isLogged =  this.authService.isLogged();
    this.userName = this.isLogged ? localStorage.getItem('USER_NAME')! : ''
  }

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  openTheme() {
    this.dialog.open(ThemeDialog, {
      width: '400px',
      panelClass: 'theme-dialog-panel',
    });
  }
  
  logOut() {
    this.authService.logout().subscribe({
      next: ()=>{
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_NAME');
        this.logout.emit();
      },
      error: (error) => {
        console.log(error.message);
      }
    } 
    )
  }
}
