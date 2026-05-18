import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AsideMenuComponent } from '../common-components/aside-menu/aside-menu';
import { KanbanService } from './service/kanban-service';
import { Observable } from 'rxjs';
import { IKanbanTask } from './interfaces/ikanban-task';
import { AsyncPipe } from '@angular/common';
import { 
  CdkDragDrop, 
  moveItemInArray, 
  transferArrayItem, 
  CdkDropListGroup, 
  CdkDropList, 
  CdkDrag,
  CdkDragHandle
} from '@angular/cdk/drag-drop';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { AddTask } from './add-task/add-task';
import { DetailTask } from './detail-task/detail-task';

@Component({
  selector: 'kanban',
  imports: [
    AsideMenuComponent,
    AsyncPipe,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    RouterLink,
    CdkDragHandle
],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban implements OnInit{
  newTasks: IKanbanTask[] = [];
  progressTasks: IKanbanTask[] = [];
  doneTasks: IKanbanTask[] = [];

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
    this.newTasks = tasks.filter(t => t.column === 'new');
    this.progressTasks = tasks.filter(t => t.column === 'progress');
    this.doneTasks = tasks.filter(t => t.column === 'done');

    this.cdr.detectChanges();
  }

  addTask(){
    const dialogRef = this.dialog.open(AddTask, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.serviceKanban.addtask(result).subscribe({
        next: () =>  this.getTasks(),
        error: (error) => console.log(error)
      })
    })
  }

  drop(event: CdkDragDrop<IKanbanTask[]>, newState: 'new' | 'progress' | 'done') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task = event.container.data[event.currentIndex];
      this.updateTaskStatus(task.id, newState);
    }
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

  private updateTaskStatus(id: number, column: 'new' | 'progress' | 'done') {
    this.serviceKanban.updateColumn(id, column).subscribe();
  }
}
