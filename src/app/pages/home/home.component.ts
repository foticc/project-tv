import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SearchBoxComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router) {}
  onSearch(text: string): void {
    if (text){
     this.router.navigateByUrl(`/home/movies?text=${text}`).then(res=>{
       console.log(res);
     })
    }
  }
}
