import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../services/type';

@Component({
  selector: 'app-recommended-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="bg-neutral-800 rounded-lg p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-neutral-100">猜你喜欢</h2>
        <button
          (click)="refreshRecommendations()"
          class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors"
        >
          <span class="material-icons text-xl">refresh</span>
          <span class="text-sm">换一批</span>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div *ngFor="let movie of recommendedMovies">
          <app-movie-card [movie]="movie"></app-movie-card>
        </div>
      </div>
    </div>
  `,
})
export class RecommendedMoviesComponent implements OnInit {
  @Input() genre!: string;
  recommendedMovies: Movie[] = [];
  // private movieService: MovieService;
  constructor() {}

  ngOnInit() {
    if (this.genre) {
      this.loadRecommendations();
    }
  }

  loadRecommendations() {
    // 假设 MovieService 有一个获取推荐电影的方法
    // this.movieService.getRandomMovies(2).subscribe((movies) => {
    //   this.recommendedMovies = movies;
    // });
  }

  refreshRecommendations() {
    this.loadRecommendations();
  }
}
