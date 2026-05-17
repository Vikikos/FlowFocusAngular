import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IKanbanTask } from '../interfaces/ikanban-task';
import { KanbanService } from '../service/kanban-service';
import { MatDialog } from '@angular/material/dialog';
import { DetailTask } from '../detail-task/detail-task';

@Component({
  selector: 'progress-column',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragHandle
  ],
  templateUrl: './progress-column.html',
  styleUrl: './progress-column.css',
})
export class ProgressColumn {
  progressTasks: IKanbanTask[] = [];

  private serviceKanban = inject(KanbanService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.serviceKanban.tasks$.subscribe({
      next: (tasks) => {
        this.filterTasks(tasks);
      },
      error: (error) => console.log(error)
    });
    this.serviceKanban.getKanban();
  }

  private filterTasks(tasks: IKanbanTask[]) {
    this.progressTasks = tasks.filter(t => t.column === 'progress');

    this.cdr.detectChanges();
  }

  showtask(idTask: number) {
    const dialogRef = this.dialog.open(DetailTask, {
      width: '500px',
      disableClose: true,
      data: {
        idTask: idTask
      }
    });

    dialogRef.afterClosed();
  }

  drop(event: CdkDragDrop<IKanbanTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
