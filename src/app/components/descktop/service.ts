import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private endpoint = 'http://flowfocus.test';

  constructor(private http: HttpClient) {}

  getCalendars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint}/api/calendars`);
  }

}