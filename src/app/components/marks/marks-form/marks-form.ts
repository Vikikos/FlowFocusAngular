// import { Component } from '@angular/core';
// import { MarksService } from '../marks-service';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { IMark } from '../interfaces/i-mark';

// @Component({
//   selector: 'app-marks-form',
//   imports: [FormsModule],
//   templateUrl: './marks-form.html',
//   styleUrl: './marks-form.css',
// })
// export class MarksForm {
//   marks: IMark[] = [];

//   text: string = this.marks.content;
//   title: string = '';

//   constructor(
//     private marksService: MarksService,
//     private router: Router,
//   ) {}

//   getMarks() {
//     this.marksService.getMarks().subscribe({
//       next: (data) => {
//         this.marks = data;
//       },
//       error: (error) => {
//         console.error('Error al encontrar notas:', error);
//       },
//     });
//   }

//   guardar() {
//     this.marksService.updateMark(this.title, this.text).subscribe({
//       next: () => this.router.navigate(['/marks']),
//       error: (err) => console.error('Error al actualizar', err),
//     });
//   }
// }
