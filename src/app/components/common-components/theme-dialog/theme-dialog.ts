import { NgClass } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'theme-dialog',
  imports: [NgClass],
  templateUrl: './theme-dialog.html',
  styleUrl: './theme-dialog.css',
  encapsulation: ViewEncapsulation.None,
})
export class ThemeDialog {
  isDark: boolean = false;

  constructor(private dialogRef: MatDialogRef<ThemeDialog>) {}

  ngOnInit() {
    this.isDark = localStorage.getItem('THEME') === 'dark';
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('THEME', this.isDark ? 'dark' : 'light');
  }

  close() {
    this.dialogRef.close();
  }
}
