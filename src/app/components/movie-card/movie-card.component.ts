import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Movie} from '../../services/type';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="movie-card max-w-[200px] bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
    >
      <div class="relative aspect-[2/3]">
        <img
          [src]="movie.posterUrl"
          [alt]="movie.title"
          class="w-full h-full object-cover"
          onerror="this.src='assets/images/default-movie-poster.jpg'"
        />
        <div
          class="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-black text-sm font-bold rounded"
        >
          {{ movie.rating }}
        </div>
      </div>

      <div class="p-4">
        <h3 class="text-lg font-semibold text-neutral-100 mb-1 truncate">
          {{ movie.title }}
        </h3>
        <div
          class="flex items-center justify-between text-sm text-neutral-400 mb-2"
        >
          <span>{{ movie.year }}</span>
        </div>
        <div class="text-sm text-neutral-400 mb-2 truncate">
          主演：{{ movie.actors.join('、') }}
        </div>
        <div class="flex flex-wrap gap-1">
          <span
            *ngFor="let genre of displayedGenres"
            class="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-300 rounded-full"
          >
            {{ genre }}
          </span>
          <span
            *ngIf="remainingGenresCount > 0"
            class="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-300 rounded-full"
          >
            +{{ remainingGenresCount }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  private maxGenres = 3; // 最多显示3个类别

  get displayedGenres(): string[] {
    return this.movie.genres.slice(0, this.maxGenres);
  }

  get remainingGenresCount(): number {
    return Math.max(0, this.movie.genres.length - this.maxGenres);
  }
}
