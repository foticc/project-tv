import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-4 h-full">
      <!-- 左侧播放器 -->
      <div class="flex-1 bg-neutral-900 rounded-lg min-h-[500px]">
        <video
          class="w-full h-full rounded-lg"
          controls
          [src]="currentVideoUrl"
        ></video>
      </div>

      <!-- 右侧集数列表 -->
      <div class="w-[300px] bg-neutral-800/80 rounded-lg p-4">
        <h3 class="text-xl font-semibold mb-4 text-neutral-100">选集</h3>
        <div class="grid grid-cols-4 gap-2">
          @for (episode of episodes; track episode.id) {
          <button
            (click)="playEpisode(episode)"
            class="p-2 text-center rounded text-neutral-100 font-medium
                     hover:bg-yellow-500 hover:text-black transition-colors
                     border border-neutral-600"
            [class.bg-yellow-500]="currentEpisode?.id === episode.id"
            [class.text-black]="currentEpisode?.id === episode.id"
            [class.border-yellow-400]="currentEpisode?.id === episode.id"
            [class.font-bold]="currentEpisode?.id === episode.id"
          >
            {{ episode.number }}
          </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class VideoPlayerComponent {
  @Input() episodes: Episode[] = [];
  currentEpisode?: Episode;
  currentVideoUrl: string = '';

  playEpisode(episode: Episode) {
    this.currentEpisode = episode;
    this.currentVideoUrl = episode.videoUrl;
  }
}

interface Episode {
  id: number;
  number: number;
  videoUrl: string;
}
