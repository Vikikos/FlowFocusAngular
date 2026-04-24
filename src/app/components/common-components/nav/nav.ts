import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-componet',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLogged: boolean = false ;
  userName: string = '';

  ngOnInit() {
    this.isLogged =  this.authService.isLogged();
    this.userName = this.isLogged ? localStorage.getItem('USER_NAME')! : ''
  }

  logOut() {
    this.authService.logout().subscribe({
      next: ()=>{
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_NAME');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error.message);
      }
    } 
    )
  }
}
