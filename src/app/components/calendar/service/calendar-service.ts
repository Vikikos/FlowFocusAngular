import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICalendar, IEvent } from '../interfaces/calendar';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private http = inject(HttpClient);
  private readonly endpoint = 'http://flowfocus.test/api';
  private readonly endpointCalendar = 'http://flowfocus.test/api/calendars';

  getCalendars(): Observable<ICalendar[]> {
    const headers = this.generateHeaders();
    return this.http.get<any>(this.endpointCalendar, { headers })
      .pipe(
        map(res => res.data as ICalendar[]),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  getEvents(idCalendar: number | string): Observable<any[]> {
    const headers = this.generateHeaders();
    return this.http.get<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks`, { headers })
      .pipe(
        map(res => res.data as any[]),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  getCalendar(id: number | string): Observable<ICalendar> {
    const headers = this.generateHeaders();
    return this.http.get<any>(`${this.endpointCalendar}/${id}`, { headers })
      .pipe(
        map(res => res.data as ICalendar),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      );
  }

  getEvent(id: number | string, idCalendar: number | string): Observable<IEvent> {
    const headers = this.generateHeaders();
    return this.http.get<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${id}`, { headers })
      .pipe(
        map(res => res.data as IEvent),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      );
  }

  addCalendar(calendar: ICalendar): Observable<ICalendar> {
    const headers = this.generateHeaders();
    return this.http.post<any>(this.endpointCalendar, calendar, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  addEvent(timeblock: IEvent, idCalendar: number | string): Observable<IEvent> {
    const headers = this.generateHeaders();
    return this.http.post<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks`, timeblock, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  updateCalendar(id:  number | string, calendarData: ICalendar): Observable<ICalendar> {
    const headers = this.generateHeaders();
    return this.http.put<any>(`${this.endpointCalendar}/${id}`, calendarData, { headers })
      .pipe(
        map(res => res.data as ICalendar),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  updateEvent(event: IEvent,idEvent: number | string, idCalendar:  number | string): Observable<IEvent> {
    const headers = this.generateHeaders();
    return this.http.put<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${idEvent}`, event,{headers})
     .pipe(
      map(res => res.data as IEvent),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  deleteCalendar(id: number | string): Observable<any> {
    const headers = this.generateHeaders();
    return this.http.delete<any>(`${this.endpointCalendar}/${id}`, { headers })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  deleteEvent(idEvent: number | string, idCalendar: number | string): Observable<any> {
    const headers = this.generateHeaders();
    return this.http.delete<any>(`${this.endpointCalendar}/${idCalendar}/timeblocks/${idEvent}`, {headers})
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
