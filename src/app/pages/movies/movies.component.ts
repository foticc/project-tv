import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Movie } from '../../services/type';
import { ApiService } from '../../services/api.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-movies',
  imports: [MovieCardComponent, PaginationComponent],
  templateUrl: './movies.component.html',
  standalone: true,
  styleUrl: './movies.component.css',
  animations: [
    trigger('moviesFade', [
      transition('true <=> false', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(15px)' }),
            stagger(50, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  // 组件类中
  currentPage = 1;
  totalPages = 10;
  animationState = true; // 添加新的状态变量

  apiService: ApiService = inject(ApiService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.apiService.pageList(this.currentPage).subscribe((res) => {
      this.movies = res;
    });
  }
  onPageChange(page: number) {
    // 先执行滚动
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // 等待滚动完成后再加载数据（大约300ms）
    setTimeout(() => {
      this.currentPage = page;
      this.apiService.pageList(page).subscribe((res) => {
        this.movies = res;
        this.toggleAnimationState();
      });
    }, 66);
  }

  toggleAnimationState() {
    this.animationState = !this.animationState;
    this.cdr.detectChanges();
  }
}
