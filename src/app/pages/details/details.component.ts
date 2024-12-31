import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {MovieDetailComponent} from '../../components/movie-detail/movie-detail.component';
import {VideoPlayerComponent} from '../../components/video-player/video-player.component';
import {RecommendedMoviesComponent} from '../../components/recommended-movies/recommended-movies.component';
import {Movie} from '../../services/type';

@Component({
  selector: 'app-details',
  imports: [
    MovieDetailComponent,
    VideoPlayerComponent,
    RecommendedMoviesComponent,
  ],
  templateUrl: './details.component.html',
  standalone: true,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  id: string | null = null;
  selectedMovie = {
    id: 2,
    title: '星际穿越',
    posterUrl:
      'https://wework.qpic.cn/wwpic/211904_vfbfHZiURImm6SE_1643293031/0',
    year: 2014,
    rating: 9.3,
    genres: "'科幻', '冒险', '剧情', '剧情', '剧情', '剧情']",
    actors: "'马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦']",
  };
  episodes: { episode: string; url: string }[] = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id1 = params.get('id');
      if (id1) {
        this.id = id1.slice(0, -5);
        this.api.details(Number.parseInt(id1)).subscribe((res) => {
          this.selectedMovie = res;
          this.episodes = this.getEpisodes(res);
        });
      }
    });
  }

  private getEpisodes(value: Movie): { episode: string; url: string }[] {
    const surls = value.surls;
    const urls = value.urls;
    if (urls && surls) {
      const sern = urls.split(surls);
       let map = sern
        .map((source) => {

          const text: string[] = source.split("#");
          console.log(text);

          return text.map(m => {
            const [episode, url] = m.split('$');
            return {episode, url};
          });
        });
     return map[1];
    }
    return [];
  }
}
