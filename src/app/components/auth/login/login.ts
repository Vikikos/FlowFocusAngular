import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'login-component',
  imports: [RouterLink,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  login() {
    this.authService.login({email :this.email, password: this.password}).subscribe(res =>{
      localStorage.setItem('AUTH_TOKEN', res.token);
      localStorage.setItem('USER_NAME', res.user.userName);
      this.router.navigate(['/profile']);
    })
  }
}
