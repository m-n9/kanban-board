import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
}

@Injectable({ providedIn: 'root' })
export class KanbanStorageService {
  private readonly STORAGE_KEY = 'kanban-board-data';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getBoard(): KanbanColumn[] {
    if (!isPlatformBrowser(this.platformId)) {
      return this.defaultBoard();
    }
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.defaultBoard();
  }

  saveBoard(board: KanbanColumn[]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(board));
  }

  private defaultBoard(): KanbanColumn[] {
    return [
      { id: 'todo', title: 'To Do', color: '#42a5f5', cards: [] },
      { id: 'inprogress', title: 'In Progress', color: '#ab47bc', cards: [] },
      { id: 'done', title: 'Done', color: '#66bb6a', cards: [] },
    ];
  }
}
