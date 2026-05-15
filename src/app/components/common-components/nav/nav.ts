import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../auth/service/auth-service';
import { Router, RouterLink } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'nav-componet',
  imports: [RouterLink,MatTooltipModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  isLogged: boolean = false ;
  userName: string = '';
  
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.isLogged =  this.authService.isLogged();
    this.userName = this.isLogged ? localStorage.getItem('USER_NAME')! : ''
  }

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  
  logOut() {
    this.authService.logout().subscribe({
      next: ()=>{
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_NAME');
        this.logout.emit();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error.message);
      }
    } 
    )
  }
}
