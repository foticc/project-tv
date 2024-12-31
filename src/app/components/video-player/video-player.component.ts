import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import Plyr from 'plyr';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [],
  template: `
    <div class="flex gap-4 h-full">
      <!-- 左侧播放器 -->
      <div
        class="flex-1 bg-neutral-900 rounded-lg h-[calc(100vh-200px)] min-h-[500px] min-w-[600px] relative"
      >
        <video
          #videoPlayer
          class="absolute inset-0 w-full h-full rounded-lg plyr-player object-contain"
          playsinline
        >
          <source [src]="currentVideoUrl" type="video/mp4" />
        </video>
      </div>

      <!-- 右侧集数列表 -->
      <div
        class="w-[300px] bg-neutral-800/80 rounded-lg p-4 shrink-0 h-[calc(100vh-200px)] overflow-y-auto"
      >
        <h3 class="text-xl font-semibold mb-4 text-neutral-100">选集</h3>
        <div class="grid grid-cols-3 gap-2">
          @for (ep of episodes; track ep.episode) {
          <button
            (click)="playEpisode(ep)"
            [class]="
              currentEpisode?.episode === ep.episode
                ? 'bg-yellow-500/80 text-white'
                : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
            "
            class="px-3 py-2 rounded transition-colors duration-200"
          >
            {{ ep.episode }}
          </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: 'video-player.component.css',
})
export class VideoPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  private player?: Plyr;
  private hls?: Hls;

  @Input() episodes: { episode: string; url: string }[] = [];
  currentEpisode?: { episode: string; url: string };
  currentVideoUrl: string = '';

  ngOnInit() {
    // 移除这里的 initPlayer 调用
  }

  ngAfterViewInit() {
    // 确保有视频源时才初始化
    if (this.episodes.length > 0) {
      this.playEpisode(this.episodes[0]);
    }
    this.initPlayer();
  }

  private initPlayer() {
    const video = this.videoPlayer.nativeElement;

    // 初始化 HLS
    if (Hls.isSupported()) {
      this.hls = new Hls({
        debug: false,
      });

      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('HLS Media attached');
      });

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS Manifest parsed');
        video.play().then((r) => console.log('start'));
      });

      if (this.currentVideoUrl) {
        this.hls.loadSource(this.currentVideoUrl);
      }
      this.hls.attachMedia(video);
    }

    // 初始化 Plyr
    this.player = new Plyr(video, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
    });
  }

  playEpisode(episode: { episode: string; url: string }) {
    this.currentEpisode = episode;
    this.currentVideoUrl = episode.url;

    // 更新 HLS 源
    if (this.hls && Hls.isSupported()) {
      console.log('Loading source:', episode.url);
      this.hls.loadSource(episode.url);
    } else {
      // 对于原生支持 HLS 的浏览器（如 Safari）
      const video = this.videoPlayer.nativeElement;
      video.src = episode.url;
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
