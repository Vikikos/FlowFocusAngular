import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './validators';
import { NgClass } from '@angular/common';
import { AuthService } from '../service/auth-service';
import { IUserRegister } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-component',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  public userForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required]
    }, {
      validators: [passwordMatchValidator]
    })
  }

  sendUser() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newser: IUserRegister = {
      userName: this.userForm.controls['userName'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      password_confirmation: this.userForm.controls['password_confirmation'].value
    };

    this.authService.signup(newser).subscribe(res => {
      console.log(res)
      // this.router.navigate(['/profile']);
    })
  }

  validateField(field: string): boolean {
    return (
      this.userForm.controls[field].invalid &&
      this.userForm.controls[field].touched
    );
  }
  passwordsDoNotMatch(): boolean {
    return (
      this.userForm.hasError('passwordMismatch') && 
      this.userForm.get('password_confirmation')?.touched === true
    );
  }
}
