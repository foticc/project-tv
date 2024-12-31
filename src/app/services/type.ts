export interface Movie {
  from?:string,
  surls?:string,
  urls?:string,
  director?: any;
  blurb?: any | undefined;
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
  genres: string;
  actors: string;
}
