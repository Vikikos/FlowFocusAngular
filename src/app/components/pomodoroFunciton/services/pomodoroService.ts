import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPomodoro } from '../interfaces/ipomodoro';
@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private apiUrl = 'http://flowfocus.test/api/pomodoro';

  constructor(private http: HttpClient) { }

  private getHeaders() {
   
    const token = localStorage.getItem('AUTH_TOKEN');

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  getSettings(): Observable<IPomodoro[]> {
    return this.http.get<IPomodoro[]>(this.apiUrl, { headers: this.getHeaders() });
  }
  updateSettings(id: number, settings: Partial<IPomodoro>): Observable<IPomodoro> {
    return this.http.put<IPomodoro>(`${this.apiUrl}/${id}`, settings, {
      headers: this.getHeaders()
    });
  }
   create(data: any): Observable<IPomodoro> {
    return this.http.post<IPomodoro>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
