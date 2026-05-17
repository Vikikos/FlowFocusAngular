import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceDescktop {
  private endpoint = 'http://flowfocus.test/api';

  constructor(private http: HttpClient) {}

  getCalendars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}/api/calendars`);
  }

  getFunc(func: string, id: number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/${func}/${id}`, { headers: this.generateHeaders() })
  }

  generateHeaders(): HttpHeaders {
    const token = localStorage.getItem('AUTH_TOKEN');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}