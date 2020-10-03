import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ICategory, IMovie } from '../_shared/movie';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: IMovie[] = [
    {
      title: "Tân Lộc Đỉnh Ký - Royal Tramp I",
      slug: "tanlocdinhki-royaltramp-1",
      year: 2001,
      kind: "long",
      category: ['chautinhtri'],
      description: "Phim kể về cuộc đời nhiều biến cố của gã lưu manh xuất thân từ Lệ Xuân Viện thành Dương Châu - Vi Tiểu Bảo. Nhờ cơ duyên, TIểu Bảo lọt vào trong cung cấm, được phục vụ dưới trướng của Tổng quản Công Công Hải Đại Phú. Hắn trở thành bạn thân của vua Khang Hy và hợp sức với vị vua trẻ trừ đi nghịch tặc Ngao Bái.",
      source: "https://jbie.cloud/0:/Movies/Chau%20Tinh%20Tri/16.%20Royal%20Tramp%20I%201992%20ViE%20mHD%20Bluray%20DD5.1%20x264-EPiK.mkv",
      poster: "https://media.ngoisao.vn/news/2019/02/22/chau-tan-tham-gia-tan-loc-dinh-ky-3-ngoisao.vn-w660-h345.jpg",
      imageSource: "https://media.ngoisao.vn/news/2019/02/22/chau-tan-tham-gia-tan-loc-dinh-ky-3-ngoisao.vn-w660-h345.jpg",
      dateUpload: "22/09/2020 10:23:59"
    },
    {
      title: "Tân Lộc Đỉnh Ký 2 - Royal Tramp II",
      slug: "tanlocdinhki-royaltramp-2",
      year: 2002,
      kind: "short",
      category: ['chautinhtri'],
      description: "Trong vai Vi Tiểu Bảo, một anh chàng vô cùng khôn ngoan lẻo mẻo, từ một chức quan rất rất bé, một tiểu thái giám giả mà leo lên được chức vị dưới 1 người trên vạn người và là một trong những cánh tay đắc lực nhất của hoàng đế Khang Hy.",
      source: "https://jbie.cloud/0:/Movies/Chau%20Tinh%20Tri/17.%20Royal%20Tramp%20II%201992%20ViE%20mHD%20Bluray%20DD5.1%20x264-EPiK.mkv",
      poster: "https://danviet.mediacdn.vn/upload/3-2015/images/2015-08-08/1439048022-chau-tinh-tri-6.jpg",
      imageSource: "https://danviet.mediacdn.vn/upload/3-2015/images/2015-08-08/1439048022-chau-tinh-tri-6.jpg",
      dateUpload: "23/09/2020 10:45:59"
    },
    {
      title: "Tân Lộc Đỉnh Ký 3 - Royal Tramp III",
      slug: "tanlocdinhki-royaltramp-3",
      year: 2012,
      kind: "short",
      category: ['deophaichautinhtri'],
      description: "Trong vai Vi Tiểu Bảo, một anh chàng vô cùng khôn ngoan lẻo mẻo, từ một chức quan rất rất bé, một tiểu thái giám giả mà leo lên được chức vị dưới 1 người trên vạn người và là một trong những cánh tay đắc lực nhất của hoàng đế Khang Hy.",
      source: "https://jbie.cloud/0:/Movies/Chau%20Tinh%20Tri/17.%20Royal%20Tramp%20II%201992%20ViE%20mHD%20Bluray%20DD5.1%20x264-EPiK.mkv",
      poster: "https://danviet.mediacdn.vn/upload/3-2015/images/2015-08-08/1439048022-chau-tinh-tri-6.jpg",
      imageSource: "https://danviet.mediacdn.vn/upload/3-2015/images/2015-08-08/1439048022-chau-tinh-tri-6.jpg",
      dateUpload: "23/010/2020 10:45:59"
    },
  ];


  private categories: ICategory[] = [
    {
      kind: "long",
      title: "Phim Bộ dài tập",
      movies: []
    },
    {
      kind: "short",
      title: "Phim ngắn",
      movies: []
    }
  ]

  constructor() { }

  getMovies(): Observable<IMovie[]> {
    return of(this.movies).pipe(delay(50));
  }

  findMovieByID(slug: string): Observable<IMovie> {
    const movie = this.movies.find(item => item.slug == slug);
    if(movie){
      return of(movie).pipe(delay(50));
    }
    return throwError(new Error("404 - Not found movie."));
  }

  getCategories(): Observable<ICategory[]> {
    return of(this.categories).pipe(delay(50));
  }

  getMoviesByCategory(kind: string): Observable<ICategory> {
    const _category = this.categories.find(item => item.kind === kind);
    console.log(_category);
    _category.movies = this.movies.filter(item => item.kind == kind);
    if(_category){
      return of(_category).pipe(delay(50));
    }
    return throwError(new Error("404 - Not found movies."));
  }

}
