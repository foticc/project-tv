import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import { Movie } from './type';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data: Movie[] = [
    {
      id: 2,
      title: '星际穿越',
      posterUrl:
        'https://wework.qpic.cn/wwpic/211904_vfbfHZiURImm6SE_1643293031/0',
      year: 2014,
      rating: 9.3,
      genres: "'科幻', '冒险', '剧情', '剧情', '剧情', '剧情']",
      actors: "'马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦']",
    },
  ];

  constructor(private http:HttpClient) {}

  list(): Observable<Movie[]> {
    return of(this.genList(0,24));
  }

  pageList(page:number): Observable<Movie[]> {
    // const start = (page-1 <0?page:page-1) * 24;
    // const end = page * 24;
    // this.fetchList();
    return this.fetchList(page);
  }

  details(id:number): Observable<Movie> {
    return this.http.get(`/api/acdetail/fixd/${id}`, {}).pipe(map(res=>res as Movie));
  }


  private fetchList(page:number):Observable<Movie[]> {
    return this.http.get("/api/acdetail/fix",{
      params:{
        page,
        size:24,
      }
    }).pipe(map(res => res as Movie[]));
  }


  private genList(start:number,end:number): Movie[] {
    const data: Movie[] = [];
    for (let i = start; i < end; i++) {
      data.push({
        id: i,
        title: '星际穿越' + i,
        posterUrl:
          'https://wework.qpic.cn/wwpic/211904_vfbfHZiURImm6SE_1643293031/0',
        year: 2014,
        rating: 9.3,
        genres: "科幻', '冒险', '剧情', '剧情', '剧情', '剧情'",
        actors: "马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦'"
      });
    }
    return data;
  }
}
