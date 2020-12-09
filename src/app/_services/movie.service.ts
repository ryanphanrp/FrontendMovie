import {Injectable} from '@angular/core';
import {forkJoin, interval, Observable} from 'rxjs';
import {ICategory, IMovie} from '../_shared/movie';
import {combineLatest, delay, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  BASE_URL = 'http://localhost:3000/';

  // httpOptions
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken()
    }),
  };

  private movies: IMovie[];

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }


  // get categories from API
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.BASE_URL + 'movie/categories', this.httpOptions)
      .pipe(delay(50));
  }

  getCates(): Observable<ICategory[] | any> {
    return this.getCategories().pipe(
      switchMap(cates => {
        return forkJoin(cates.map(cate => this.getMoviesByCategory(cate.name)));
      })
    );
  }

  demo(): Observable<ICategory[] | any> {
    return this.getCategories().pipe(map( categories => {
      return categories.map(category => this.getMoviesByCategory(category.name));
    }));
  }

  getMoviesByCategory(name: string): Observable<ICategory | undefined> {
    return forkJoin(this.getMoviesByCategoryAPI(name), this.getACategory(name)).pipe(
      map(([movies, cate]) => {
        cate.movies = movies;
        return cate;
      })
    );
  }

  // get a category from categories
  getACategory(name: string): Observable<ICategory | undefined> {
    return this.getCategories().pipe(
      map((cates: ICategory[]) => {
        return cates.find(cate => cate.name === name);
      })
    );
  }


  // get phim theo category tu server
  getMoviesByCategoryAPI(name: string): Observable<IMovie[] | undefined> {
    return this.http.get<IMovie[]>(this.BASE_URL + 'movie/categories/' + name, this.httpOptions).pipe(delay(50));
  }


  // get all movies
  getMovies(): Observable<IMovie[] | undefined> {
    return this.http.get<IMovie[]>(this.BASE_URL + 'movie/phimle', this.httpOptions).pipe(map(movies => movies), delay(50));
  }


  // old
  findMovieByID(slug: string): Observable<IMovie | undefined> {
    return this.getMovies().pipe(
      map((movies: IMovie[]) => {
        return movies.find(movie => movie._id === slug);
      }),
      tap(console.log)
    );
  }

  findMovieBySlug(slug: string): Observable<IMovie | undefined> {
    return this.http.get<IMovie>(this.BASE_URL + 'movie/watch/' + slug, this.httpOptions).pipe(delay(50));
  }

  searchMovie(slug: string): Observable<IMovie[] | undefined> {
    return this.http.get<IMovie[]>(this.BASE_URL + 'movie/search/?search=' + slug, this.httpOptions).pipe(delay(50));
  }

  addComment(payload): Observable<any> {
    return this.http.post(this.BASE_URL + 'movie/comment/create', {
      movie_id: payload.movieID,
      comment: payload.comment
    }, this.httpOptions).pipe(delay(50));
  }

  getComment(payload): Observable<any> {
    return this.http.post(this.BASE_URL + 'movie/comment/get', {
      movie_id: payload,
    }, this.httpOptions).pipe(delay(50));
  }

  deleteComment(payload): Observable<any> {
    return this.http.post(this.BASE_URL + 'movie/comment/delete', {
      id: payload,
    }, this.httpOptions).pipe(delay(50));
  }

}
