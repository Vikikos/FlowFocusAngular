import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IKanbanTask } from '../interfaces/ikanban-task';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  private http = inject(HttpClient);
  private endpoint = 'http://flowfocus.test/api';

  private tasksSubject = new BehaviorSubject<IKanbanTask[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  getKanban(){
    this.http.get<any>(`${this.endpoint}/kanban`, { headers: this.generateHeaders() })
    .subscribe({
      next: (result) => {
        this.tasksSubject.next(result.data);
      },
      error: () => {
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      }
    });
  }

  getTask(idTask: number): Observable<IKanbanTask> {
    return this.http.get<any>(`${this.endpoint}/tasks/${idTask}`, { headers: this.generateHeaders() })
    .pipe(
        map(res => res.data as IKanbanTask),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  addtask(task: IKanbanTask): Observable<IKanbanTask> {
    return this.http.post<any>(`${this.endpoint}/tasks`, task, { headers: this.generateHeaders() })
    .pipe(
        map(res => res.data as IKanbanTask),
        catchError(error => {
          return throwError(() => new Error(error.error?.message || 'Error del servidor'))
        })
      )
  }

  updateColumn(id: number, column: 'new' | 'progress' | 'done') {
    return this.http.patch<any>(`${this.endpoint}/tasks/${id}/move`, { column }, { headers: this.generateHeaders() })
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
