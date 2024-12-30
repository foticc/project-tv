import {Component, OnInit} from '@angular/core';
import {MovieDetailComponent} from '../../components/movie-detail/movie-detail.component';
import { RecommendedMoviesComponent } from "../../components/recommended-movies/recommended-movies.component";
import {ApiService} from '../../services/api.service';
import {Movie} from '../../services/type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-variety',
  imports: [
    MovieDetailComponent,
    RecommendedMoviesComponent
],
  templateUrl: './variety.component.html',
  standalone: true,
  styleUrl: './variety.component.css'
})
export class VarietyComponent implements OnInit {
  selectedMovie:Movie =
{
  id: 2,
  title: '星际穿越',
  posterUrl:
    'https://wework.qpic.cn/wwpic/211904_vfbfHZiURImm6SE_1643293031/0',
  year: 2014,
  rating: 9.3,
  genres: "'科幻', '冒险', '剧情', '剧情', '剧情', '剧情']",
  actors: "'马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦']",
  director:"123",
  blurb:"12321321"
}

  constructor(private apiService: ApiService,private router:Router) {
  }


  ngOnInit(): void {
  }

  onEpisodeSelected(episode: number) {
    console.log(episode);
    this.router.navigate(['/home/play/'+episode]).then(res=>{
      console.log(res);
    });
  }
}
