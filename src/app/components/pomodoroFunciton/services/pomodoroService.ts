import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPomodoro } from '../interfaces/ipomodoro';
@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private apiUrl = 'http://flowfocus.test/api/pomodoro';

  constructor(private http: HttpClient) { }

  getSettings(): Observable<IPomodoro[]> {
    return this.http.get<IPomodoro[]>(this.apiUrl);
  }

  updateSettings(id: number, settings: Partial<IPomodoro>): Observable<IPomodoro> {
    return this.http.put<IPomodoro>(`${this.apiUrl}/${id}`, settings);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
