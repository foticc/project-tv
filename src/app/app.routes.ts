import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        children: [
          {
            path: 'movies',
            loadComponent: () =>
              import('./pages/movies/movies.component').then(
                (m) => m.MoviesComponent
              ),
          },
          {
            path: 'tv-shows',
            loadComponent: () =>
              import('./pages/tv-shows/tv-shows.component').then(
                (m) => m.TvShowsComponent
              ),
          },
          {
            path: 'variety',
            loadComponent: () =>
              import('./pages/variety/variety.component').then(
                (m) => m.VarietyComponent
              ),
          },
          {
            path: 'anime',
            loadComponent: () =>
              import('./pages/anime/anime.component').then(
                (m) => m.AnimeComponent
              ),
          },
          {
            path: 'documentary',
            loadComponent: () =>
              import('./pages/documentary/documentary.component').then(
                (m) => m.DocumentaryComponent
              ),
          },
          {
            path: 'movies/:id',
            loadComponent: () =>
              import('./pages/details/details.component').then(
                (m) => m.DetailsComponent
              ),
          },
          {
            path: 'play/:id',
            loadComponent: () =>
              import('./pages/play-details/play-details.component').then(
                (m) => m.PlayDetailsComponent
              ),
          },
        ],
      },
    ],
  },
];
