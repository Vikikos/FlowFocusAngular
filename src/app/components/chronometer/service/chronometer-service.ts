import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IChronometer } from '../interfaces/chronometer';

@Injectable({
  providedIn: 'root',
})
export class ChronometerService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api/chronometer';

  getChronometer(id: number): Observable<IChronometer> {
    return this.http.get<any>(`${this.endpoint}/${id}`)
    .pipe(
      map(res => res.data as IChronometer),
      catchError(error => {
        return throwError(() => new Error(error.error?.message || 'Error del servidor'))
      })
    );
  }
}
