import { Component } from '@angular/core';
import { MarksService } from '../marks-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IMark } from '../interfaces/i-mark';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-marks-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './marks-list.html',
  styleUrl: './marks-list.css',
})
export class MarksList {

  text: string = '';
  title: string = '';
    
  marks: any[] = [];
  constructor(private marksService: MarksService,
    private router: Router
  ) {
    
  }
  
  ngOnInit() {
    this.getMarks();
  }
  
  getMarks() {
    this.marksService.getMarks().subscribe({
      next: (data) => {
        this.marks = data;
      },
      error: (error) => {
        console.error('Error al encontrar notas:', error);
      }
    });
  }

  createMarks() {
    this.marksService.createMarks(this.title, this.text).subscribe({
        error: (err) => console.error('Error al crear', err)
      });
  }
}
