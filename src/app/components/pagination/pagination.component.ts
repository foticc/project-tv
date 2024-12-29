import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center gap-2 text-white">
      <!-- 上一页 -->
      <button
        (click)="onPageChange(currentPage - 1)"
        [disabled]="currentPage === 1"
        class="px-3 py-1 rounded border border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 text-white"
      >
        上一页
      </button>

      <!-- 页码 -->
      <div class="flex gap-1">
        <!-- 第一页 -->
        <button
          *ngIf="showFirst"
          (click)="onPageChange(1)"
          class="px-3 py-1 rounded text-white hover:bg-neutral-700"
          [class.bg-blue-600]="currentPage === 1"
        >
          1
        </button>

        <!-- 左省略号 -->
        <span *ngIf="showLeftDots" class="px-2 py-1 text-white">...</span>

        <!-- 中间页码 -->
        <button
          *ngFor="let page of visiblePages"
          (click)="onPageChange(page)"
          class="px-3 py-1 rounded text-white hover:bg-neutral-700"
          [class.bg-blue-600]="currentPage === page"
        >
          {{ page }}
        </button>

        <!-- 右省略号 -->
        <span *ngIf="showRightDots" class="px-2 py-1 text-white">...</span>

        <!-- 最后一页 -->
        <button
          *ngIf="showLast"
          (click)="onPageChange(totalPages)"
          class="px-3 py-1 rounded text-white hover:bg-neutral-700"
          [class.bg-blue-600]="currentPage === totalPages"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- 下一页 -->
      <button
        (click)="onPageChange(currentPage + 1)"
        [disabled]="currentPage === totalPages"
        class="px-3 py-1 rounded border border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 text-white"
      >
        下一页
      </button>
    </div>
  `,
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get visiblePages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let start = Math.max(
      Math.min(
        this.currentPage - Math.floor(maxVisiblePages / 2),
        this.totalPages - maxVisiblePages + 1
      ),
      2
    );
    let end = Math.min(start + maxVisiblePages - 1, this.totalPages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(2, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  get showFirst(): boolean {
    return this.currentPage !== 1 && this.visiblePages[0] > 2;
  }

  get showLast(): boolean {
    return (
      this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    );
  }

  get showLeftDots(): boolean {
    return this.visiblePages[0] > 2;
  }

  get showRightDots(): boolean {
    return (
      this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1
    );
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
