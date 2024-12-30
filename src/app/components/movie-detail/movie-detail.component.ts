import { Component, Input } from '@angular/core';
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
      <div class="flex gap-8">
        <!-- 左侧海报 -->
        <div class="w-[300px] flex-shrink-0">
          <div class="relative aspect-[2/3]">
            <img
              [src]="movie.posterUrl"
              [alt]="movie.title"
              class="w-full h-full object-cover rounded-lg"
              onerror="this.src='assets/images/default-movie-poster.jpg'"
            />
            <div
              class="absolute top-3 right-3 px-3 py-2 bg-yellow-500 text-black text-lg font-bold rounded"
            >
              {{ movie.rating }}
            </div>
          </div>
        </div>

        <!-- 右侧信息 -->
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-neutral-100 mb-2">
            {{ movie.title }}
            <span class="text-xl text-neutral-400 ml-3"
              >({{ movie.year }})</span
            >
          </h1>

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
          <div class="space-y-4 text-neutral-300">
            <div class="text-lg">
              <h3 class="text-neutral-400 mb-1">主演</h3>
              <p>{{ movie.actors.split(',').join('、') }}</p>
            </div>

            <div class="text-lg">
              <h3 class="text-neutral-400 mb-1">导演</h3>
              <p>{{ movie.director }}</p>
            </div>

            <div>
              <h3 class="text-neutral-400 mb-1">剧情简介</h3>
              <p class="text-lg leading-relaxed">{{ movie.blurb }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MovieDetailComponent {
  @Input() movie!: Movie;
}
