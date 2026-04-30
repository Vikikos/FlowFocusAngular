import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMark } from './interfaces/i-mark';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  private apiUrl = 'http://flowfocus.test/api/marks';

  constructor(private http: HttpClient) {}

  getMarks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMarks(contenido: string, titulo: string): Observable<any> {
    const body = { content: contenido, user_id: 1, title: titulo };
    return this.http.post(this.apiUrl, body);
  }
  updateMark(id:number ,title: string, content: string): Observable<IMark> {
    return this.http.patch<IMark>(`${this.apiUrl}/${id}`, {title, content});
  }
}
