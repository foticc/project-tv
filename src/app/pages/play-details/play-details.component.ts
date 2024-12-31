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

    // ...更多集数
  ];
}
