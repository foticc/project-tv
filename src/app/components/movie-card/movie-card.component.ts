import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div (click)="navigateToDetail()" [class]="getCardClasses()">
      <div class="relative aspect-[2/3]">
        <img
          [src]="movie.posterUrl"
          [alt]="movie.title"
          class="w-full h-full object-cover"
          onerror="this.src='assets/images/default-movie-poster.jpg'"
        />
        <div [class]="getRatingClasses()">
          {{ movie.rating }}
        </div>
      </div>

      <div [class]="getContentClasses()">
        <h3 [class]="getTitleClasses()">
          {{ movie.title }}
        </h3>
        <div
          class="flex items-center justify-between text-sm text-neutral-400 mb-2"
        >
          <span>{{ movie.year }}</span>
        </div>
        <div class="text-sm text-neutral-400 mb-2 truncate">
          主演：{{ movie.actors.split(',').join('、') }}
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
  @Input() size: 'small' | 'medium' = 'medium';
  private maxGenres = 3;

  constructor(private router: Router) {}

  get displayedGenres(): string[] {
    return this.movie.genres.split(',').slice(0, this.maxGenres);
  }

  get remainingGenresCount(): number {
    return Math.max(0, this.movie.genres.length - this.maxGenres);
  }

  navigateToDetail() {
    this.router.navigate(['/home/movies', this.movie.id + '.html']);
  }

  getCardClasses(): string {
    const baseClasses =
      'movie-card bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform cursor-pointer border border-neutral-700';
    return this.size === 'small'
      ? `${baseClasses} max-w-[150px] h-[280px]`
      : `${baseClasses} max-w-[200px] h-[360px]`;
  }

  getRatingClasses(): string {
    const baseClasses =
      'absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-black font-bold rounded';
    return this.size === 'small'
      ? `${baseClasses} text-xs`
      : `${baseClasses} text-sm`;
  }

  getContentClasses(): string {
    return this.size === 'small' ? 'p-2' : 'p-4';
  }

  getTitleClasses(): string {
    const baseClasses = 'font-semibold text-neutral-100 mb-1 truncate';
    return this.size === 'small'
      ? `${baseClasses} text-base`
      : `${baseClasses} text-lg`;
  }
}
