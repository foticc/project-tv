import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/type';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="movie-detail bg-neutral-800 rounded-lg overflow-hidden shadow-lg p-6"
    >
      <!-- 移除了左侧海报区域，调整主要内容布局 -->
      <div class="flex flex-col">
        <!-- 标题部分 -->
        <div class="flex items-center gap-4 mb-6">
          <h1 class="text-3xl font-bold text-neutral-100">
            {{ movie.title }}
            <span class="text-xl text-neutral-400 ml-3"
              >({{ movie.year }})</span
            >
          </h1>
          <div
            class="px-3 py-2 bg-yellow-500 text-black text-lg font-bold rounded"
          >
            {{ movie.rating }}
          </div>
        </div>

        <!-- 类别标签 -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            *ngFor="let genre of movie.genres.split(',')"
            class="px-3 py-1 text-sm bg-neutral-700 text-neutral-300 rounded-full"
          >
            {{ genre }}
          </span>
        </div>

        <!-- 主要信息 -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div class="text-lg">
            <h3 class="text-neutral-400 mb-1">主演</h3>
            <p class="text-neutral-300">
              {{ movie.actors.split(',').join('、') }}
            </p>
          </div>

          <div class="text-lg">
            <h3 class="text-neutral-400 mb-1">导演</h3>
            <p class="text-neutral-300">{{ movie.director }}</p>
          </div>
        </div>

        <div class="mb-8">
          <h3 class="text-neutral-400 mb-1">剧情简介</h3>
          <p class="text-lg leading-relaxed text-neutral-300">
            {{ movie.blurb }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class MovieDetailComponent {
  _movie!: Movie;

  @Input()
  set movie(value: Movie) {
    this._movie = value;
  }

  get movie(): Movie {
    return this._movie;
  }
}
