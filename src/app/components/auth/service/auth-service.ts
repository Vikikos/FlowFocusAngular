import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUserRegister } from '../interfaces/user';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'http://flowfocus.test/api';

  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/login`, credentials);
  }

  logout(): Observable<any> {
    const headers = this.generateHeaders();
    return this.http.post<any>(`${this.endpoint}/logout`,{},{ headers})
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

  signup(newUser: IUserRegister): Observable<any> {
    return this.http
    .post<IUserRegister>(`${this.endpoint}/signup`,newUser)
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

  getUserData(): Observable<IUser> {
    const headers = this.generateHeaders();
    return this.http.get<any>(`${this.endpoint}/user`,{headers})
    .pipe(
      map(res => res.data as IUser),
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

  generateHeaders(): HttpHeaders {
    const token = localStorage.getItem('AUTH_TOKEN');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  isLogged(): boolean{
    return localStorage.getItem('AUTH_TOKEN') !== null;
  }

}
