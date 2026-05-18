import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IPomodoro } from '../interfaces/ipomodoro';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://flowfocus.test/api/pomodoro';

  private settingsSubject = new BehaviorSubject<IPomodoro[]>([]);
  settings$ = this.settingsSubject.asObservable();

  getSettings() {
    const headers = this.getHeaders();
    this.http.get<any>(this.apiUrl, { headers })
      .subscribe({
        next: (result) => {
          this.settingsSubject.next(result.data);
        },
        error: () => {
          catchError(error => {
            return throwError(() => new Error(error.error?.message || 'Error del servidor'));
          });
        }
      });
  }

  getSetting(id: number): Observable<IPomodoro> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        map(res => res.data as IPomodoro),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'));
        })
      );
  }

  updateSettings(id: number, settings: Partial<IPomodoro>): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, settings, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'));
        })
      );
  }

  create(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, data, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'));
        })
      );
  }

  delete(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'));
        })
      );
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('AUTH_TOKEN');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
