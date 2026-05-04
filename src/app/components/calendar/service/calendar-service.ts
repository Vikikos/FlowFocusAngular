import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICalendar } from '../interfaces/calendar';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api/calendars';

  getCalendars(): Observable<ICalendar[]> {
    const headers = this.generateHeaders();
    return this.http.get<any>(this.endpoint, { headers })
    .pipe(
      map(res => res.data as ICalendar[]),
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
}
