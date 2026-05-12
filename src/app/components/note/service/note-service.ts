import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INote } from '../interfaces/note';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api/marks';

  getNotes(): Observable<INote[]> {
    return this.http.get<any>(this.endpoint, { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as INote[]),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  getNote(id: number): Observable<INote> {
    return this.http.get<any>(`${this.endpoint}/${id}` , { headers: this.generateHeaders() })
      .pipe(
        map(res => res.data as INote),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  addNote(note: INote): Observable<INote> {
    return this.http.post<any>(this.endpoint, note, { headers: this.generateHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}` , { headers: this.generateHeaders() })
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
