import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KanbanCard } from './kanban-storage.service';
import { NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [NgIf, MatMenuModule, MatIconModule, MatButtonModule],
  template: `
    <div class="kanban-card">
      <div class="card-header">
        <h4>{{ card.title }}</h4>
        <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Card actions">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="onEdit()">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
          <button mat-menu-item (click)="onDelete()">
            <mat-icon>delete</mat-icon>
            Delete
          </button>
        </mat-menu>
      </div>
      <p *ngIf="card.description">{{ card.description }}</p>
    </div>
  `,
  styleUrls: ['./kanban-card.component.scss']
})
export class KanbanCardComponent {
  @Input() card!: KanbanCard;
  @Output() editCard = new EventEmitter<void>();
  @Output() deleteCard = new EventEmitter<void>();

  onEdit() {
    this.editCard.emit();
  }

  onDelete() {
    this.deleteCard.emit();
  }
}
