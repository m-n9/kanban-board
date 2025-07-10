import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-card-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Add New Card</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="dialog-field">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="dialog-field">
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="data.description"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-flat-button color="primary" (click)="onCreate()" [disabled]="!data.title">Create</button>
    </mat-dialog-actions>
  `,
  styles: [`.dialog-field { width: 100%; margin-bottom: 1rem; }`]
})
export class CreateCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    this.dialogRef.close(this.data);
  }
}
