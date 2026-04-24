import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChronometerService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api';
}
