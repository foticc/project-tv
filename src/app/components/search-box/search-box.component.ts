import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-box relative inline-block">
      <input
        type="text"
        [(ngModel)]="searchText"
        (keyup.enter)="onSearch()"
        placeholder="搜索..."
        class="w-64 px-3 py-1.5 pr-10 text-sm text-neutral-200 bg-neutral-800 border border-neutral-700 rounded focus:outline-none focus:border-neutral-600 placeholder:text-neutral-500"
      />
      <button
        (click)="onSearch()"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-700 rounded-sm focus:outline-none z-50 pointer-events-auto"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-neutral-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  `,
})
export class SearchBoxComponent {
  searchText: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchText);
  }
}
