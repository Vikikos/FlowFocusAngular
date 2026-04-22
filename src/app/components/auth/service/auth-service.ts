import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'http://flowfocus.test';

  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/api/login`, credentials,{withCredentials: true});
  }

  signup(newUser: IUserRegister): Observable<any> {
    return this.http
    .post<IUserRegister>(`${this.endpoint}/api/signup`,newUser)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

}
