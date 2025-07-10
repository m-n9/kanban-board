import { Component, OnInit, ViewChild } from '@angular/core';
import {
  KanbanStorageService,
  KanbanColumn,
  KanbanCard,
} from './kanban-storage.service';
import { NgFor, NgIf } from '@angular/common';
import { KanbanCardComponent } from './kanban-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateCardDialogComponent } from './create-card-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    KanbanCardComponent,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    SweetAlert2Module,
    MatSidenavModule,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
})
export class KanbanBoardComponent implements OnInit {
  columns: KanbanColumn[] = [];
  cardDropListIds: string[] = [];
  undoStack: KanbanColumn[][] = [];
  redoStack: KanbanColumn[][] = [];


  constructor(
    private storage: KanbanStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.columns = this.storage.getBoard();
    this.updateCardDropListIds();
  }

  updateCardDropListIds() {
    this.cardDropListIds = this.columns.map((_, i) => `cards-list-${i}`);
  }

  saveStateForUndo() {
    this.undoStack.push(JSON.parse(JSON.stringify(this.columns)));
    this.redoStack = [];
  }

  undo() {
    if (this.undoStack.length) {
      this.redoStack.push(JSON.parse(JSON.stringify(this.columns)));
      this.columns = this.undoStack.pop()!;
      this.storage.saveBoard(this.columns);
      this.updateCardDropListIds();
    }
  }

  redo() {
    if (this.redoStack.length) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.columns)));
      this.columns = this.redoStack.pop()!;
      this.storage.saveBoard(this.columns);
      this.updateCardDropListIds();
    }
  }

  addCard(column: KanbanColumn) {
    this.saveStateForUndo();
    const dialogRef = this.dialog.open(CreateCardDialogComponent, {
      data: { title: '', description: '' },
      width: '400px',
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.title) {
        const newCard: KanbanCard = {
          id: Date.now().toString(),
          title: result.title,
          description: result.description,
          createdAt: Date.now(),
        };
        column.cards.push(newCard);
        this.storage.saveBoard(this.columns);
      }
    });
  }

  dropCard(event: CdkDragDrop<KanbanCard[]>, column: KanbanColumn) {
    this.saveStateForUndo();
    if (event.previousContainer === event.container) {
      moveItemInArray(column.cards, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.storage.saveBoard(this.columns);
  }

  dropColumn(event: CdkDragDrop<KanbanColumn[]>) {
    this.saveStateForUndo();
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.storage.saveBoard(this.columns);
    this.updateCardDropListIds();
  }

  editColumnTitle(column: KanbanColumn) {
    Swal.fire({
      title: 'Rename column',
      input: 'text',
      inputValue: column.title,
      showCancelButton: true,
      confirmButtonText: 'Rename',
      background: '#f8fafc',
      customClass: { confirmButton: 'mat-flat-button mat-primary' },
    }).then((result) => {
      if (result.isConfirmed && result.value && result.value.trim()) {
        this.saveStateForUndo();
        column.title = result.value.trim();
        this.storage.saveBoard(this.columns);
      }
    });
  }

  async deleteColumn(index: number) {
    const result = await Swal.fire({
      title: 'Delete this column?',
      text: 'All cards in this column will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#f8fafc',
      customClass: { confirmButton: 'mat-flat-button mat-warn' },
    });
    if (result.isConfirmed) {
      this.saveStateForUndo();
      this.columns.splice(index, 1);
      this.storage.saveBoard(this.columns);
      this.updateCardDropListIds();
    }
  }

  editCard(column: KanbanColumn, card: KanbanCard) {
    this.saveStateForUndo();
    const dialogRef = this.dialog.open(CreateCardDialogComponent, {
      data: { title: card.title, description: card.description },
      width: '400px',
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.title) {
        card.title = result.title;
        card.description = result.description;
        this.storage.saveBoard(this.columns);
      }
    });
  }

  async deleteCard(column: KanbanColumn, cardIdx: number) {
    const result = await Swal.fire({
      title: 'Delete this card?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#f8fafc',
      customClass: { confirmButton: 'mat-flat-button mat-warn' },
    });
    if (result.isConfirmed) {
      this.saveStateForUndo();
      column.cards.splice(cardIdx, 1);
      this.storage.saveBoard(this.columns);
    }
  }

  // Keyboard reordering for columns and cards
  moveColumn(index: number, direction: number) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < this.columns.length) {
      this.saveStateForUndo();
      moveItemInArray(this.columns, index, newIndex);
      this.storage.saveBoard(this.columns);
      this.updateCardDropListIds();
    }
  }

  moveCard(column: KanbanColumn, cardIdx: number, direction: number) {
    const newIndex = cardIdx + direction;
    if (newIndex >= 0 && newIndex < column.cards.length) {
      this.saveStateForUndo();
      moveItemInArray(column.cards, cardIdx, newIndex);
      this.storage.saveBoard(this.columns);
    }
  }

  // Color picker for columns
  async pickColumnColor(column: KanbanColumn) {
    const result = await Swal.fire({
      title: 'Pick a color',
      input: 'color' as any,
      inputValue: column.color,
      showCancelButton: true,
      confirmButtonText: 'Set Color',
      background: '#f8fafc',
      customClass: { confirmButton: 'mat-flat-button mat-primary' },
    });
    if (result.isConfirmed && result.value) {
      this.saveStateForUndo();
      column.color = result.value;
      this.storage.saveBoard(this.columns);
    }
  }

  async addColumn() {
    const result = await Swal.fire({
      title: 'Add New Column',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Column name">' +
        '<input id="swal-input2" type="color" class="swal2-input" value="#42a5f5" style="height: 2.5em;">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      background: '#f8fafc',
      preConfirm: () => {
        const name = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const color = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        if (!name || !name.trim()) {
          Swal.showValidationMessage('Column name is required');
          return;
        }
        return { name: name.trim(), color };
      },
      customClass: { confirmButton: 'mat-flat-button mat-primary' },
    });
    if (result.isConfirmed && result.value) {
      this.saveStateForUndo();
      this.columns.push({
        id: Date.now().toString(),
        title: result.value.name,
        color: result.value.color,
        cards: [],
      });
      this.storage.saveBoard(this.columns);
      this.updateCardDropListIds();
    }
  }

  openInfoDialog() {
    this.dialog.open(this.infoDialog);
  }

  @ViewChild('infoDialog') infoDialog: any;
}
