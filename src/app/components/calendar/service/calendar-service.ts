import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICalendar, IEvent } from '../interfaces/calendar';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private http = inject(HttpClient);
  private readonly endpoint = 'http://flowfocus.test/api';
  private readonly endpointCalendar = 'http://flowfocus.test/api/calendars';

  private calendarsSubject = new BehaviorSubject<ICalendar[]>([]);
  calendars$ = this.calendarsSubject.asObservable();

  getCalendars() {
    this.http.get<any>(this.endpointCalendar, { headers: this.generateHeaders() })
     .subscribe({
      next: (result) => {
        this.calendarsSubject.next(result.data);
      },
      error: () => {
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      }
    })
  }

  getEvents(idCalendar: number | string): Observable<any[]> {
    return this.http.get<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks`, { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as any[]),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  getCalendar(id: number | string): Observable<ICalendar> {
    return this.http.get<any>(`${this.endpointCalendar}/${id}`, { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as ICalendar),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      );
  }

  getEvent(id: number | string, idCalendar: number | string): Observable<IEvent> {
    return this.http.get<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${id}`, { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as IEvent),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      );
  }

  addCalendar(calendar: ICalendar): Observable<ICalendar> {
    return this.http.post<any>(this.endpointCalendar, calendar, { headers: this.generateHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  addEvent(timeblock: IEvent, idCalendar: number | string): Observable<IEvent> {
    return this.http.post<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks`, timeblock, { headers: this.generateHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  updateCalendar(id:  number | string, calendarData: ICalendar): Observable<ICalendar> {
    return this.http.put<any>(`${this.endpointCalendar}/${id}`, calendarData, { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as ICalendar),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  updateEvent(event: IEvent,idEvent: number | string, idCalendar:  number | string): Observable<IEvent> {
    return this.http.put<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${idEvent}`, event, { headers: this.generateHeaders() })
     .pipe(
      map(res => res.data as IEvent),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  deleteCalendar(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.endpointCalendar}/${id}`, { headers: this.generateHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  deleteEvent(idEvent: number | string, idCalendar: number | string): Observable<any> {
    return this.http.delete<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${idEvent}`, { headers: this.generateHeaders() })
      .pipe(
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
