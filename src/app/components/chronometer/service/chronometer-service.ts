import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IChronometer } from '../interfaces/chronometer';

@Injectable({
  providedIn: 'root',
})
export class ChronometerService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api/chronometers';

  private chronometersSubject = new BehaviorSubject<IChronometer[]>([]);
  chronometers$ = this.chronometersSubject.asObservable();

  getChronometers() {
    const headers = this.generateHeaders();
    this.http.get<any>(this.endpoint,{headers})
    .subscribe({
      next: (result) => {
        this.chronometersSubject.next(result.data);
      },
      error: () => {
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      }
    })
  }

  getChronometer(id: number): Observable<IChronometer> {
    const headers = this.generateHeaders();
    return this.http.get<any>(`${this.endpoint}/${id}`,{headers})
    .pipe(
      map(res => res.data as IChronometer),
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    );
  }

  addChronometer(chronometer: IChronometer): Observable<any> {
    const headers = this.generateHeaders();
    return this.http.post<any>(this.endpoint, chronometer,{headers})
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

  updateChronometer(id: number,chronometerData: IChronometer): Observable<any> {
    const headers = this.generateHeaders();
    return this.http.put<any>(`${this.endpoint}/${id}`, chronometerData, {headers})
    .pipe(
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    )
  }

  deleteChronometer(id: number) {
    const headers = this.generateHeaders();
    return this.http.delete<IChronometer>(`${this.endpoint}/${id}`,{headers})
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
