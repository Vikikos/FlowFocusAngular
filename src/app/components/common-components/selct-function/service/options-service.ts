import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private apiUrl = 'http://flowfocus.test';

  constructor(private http: HttpClient) {}

}
