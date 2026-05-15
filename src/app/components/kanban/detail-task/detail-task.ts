import { Component, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanService } from '../service/kanban-service';
import { IKanbanTask } from '../interfaces/ikanban-task';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'detail-task',
  imports: [AsyncPipe],
  templateUrl: './detail-task.html',
  styleUrl: './detail-task.css',
})
export class DetailTask {
  task$!: Observable<IKanbanTask>;

  private dialogRef = inject(MatDialogRef);
  private serviceKanban = inject(KanbanService);
  private data = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    this.task$ = this.serviceKanban.getTask(this.data.idTask);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  columnViewName(column: string): string {
    const translations: Record<string, string> = {
      'new':      'Nuevo',
      'in_progress': 'En Progreso',
      'done':     'Hecho',
    };

    return translations[column.toLowerCase()] || column;
  }
}
