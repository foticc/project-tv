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
          <app-movie-card [movie]="movie" size="small"></app-movie-card>
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

    this.recommendedMovies = [
      {
        id: 2,
        title: '星际穿越',
        posterUrl:
          'https://wework.qpic.cn/wwpic/211904_vfbfHZiURImm6SE_1643293031/0',
        year: 2014,
        rating: 9.3,
        genres: "'科幻', '冒险', '剧情', '剧情', '剧情', '剧情']",
        actors: "'马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦']",
      },
    ];
  }

  refreshRecommendations() {
    this.loadRecommendations();
  }
}
