import { Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-tv-shows',
  imports: [PaginationComponent],
  templateUrl: './tv-shows.component.html',
  standalone: true,
  styleUrl: './tv-shows.component.css',
})
export class TvShowsComponent {
  // 组件类中
  currentPage = 1;
  totalPages = 10;

  onPageChange(page: number) {
    this.currentPage = page;
    // 处理页面变化，例如加载新数据
    console.log(page);
  }
}
