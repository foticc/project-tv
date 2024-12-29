import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {SearchBoxComponent} from '../../components/search-box/search-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SearchBoxComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = '追影网';

  onSearch(text:string):void {
    console.log(text);
  }
}
