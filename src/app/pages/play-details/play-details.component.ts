import { Component } from '@angular/core';
import {VideoPlayerComponent} from '../../components/video-player/video-player.component';

@Component({
  selector: 'app-play-details',
  imports: [
    VideoPlayerComponent
  ],
  templateUrl: './play-details.component.html',
  standalone: true,
  styleUrl: './play-details.component.css',
})
export class PlayDetailsComponent {
  episodes = [
    { id: 1, number: 1, videoUrl: 'url1' },
    { id: 2, number: 2, videoUrl: 'url2' },
    // ...更多集数
  ];
}
