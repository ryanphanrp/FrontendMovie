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
  movie: IMovie[] = [
    {
      title: 'phim so 1',
      _id: 'gsdfgerwerygdf',
      slug: 'phimso1',
      year: 2019,
      kind: 'phimbo',
      category: [
        'phimngan',
        'phimhoathinh',
        'phimhaihuoc'
      ],
      description: 'Day la bo phim so 1',
      source: ['https://drive.google.com/uc?export=download&id=19aldzZ1mWLlDB_6TISBpWTb9tlRG87La'],
      poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      imageSource: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      dateUpload: '2020-10-04 23:11'
    },
    {
      title: 'phim so 2',
      _id: 'gsdfgersdgygdf',
      slug: 'phimso2',
      year: 2019,
      kind: 'phimbo',
      category: [
        'phimngan',
        'phimhoathinh',
        'phimhaihuoc'
      ],
      description: 'Day la bo phim so 1',
      source: ['https://drive.google.com/uc?export=download&id=19aldzZ1mWLlDB_6TISBpWTb9tlRG87La'],
      poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      imageSource: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      dateUpload: '2020-10-04 23:11'
    },
    {
      title: 'phim so 3',
      _id: 'gsdfger75675df',
      slug: 'phimso3',
      year: 2019,
      kind: 'phimbo',
      category: [
        'phimngan',
        'phimhoathinh',
        'phimhaihuoc'
      ],
      description: 'Day la bo phim so 1',
      source: ['https://drive.google.com/uc?export=download&id=19aldzZ1mWLlDB_6TISBpWTb9tlRG87La'],
      poster: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      imageSource: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362',
      dateUpload: '2020-10-04 23:11'
    }
  ];
  private movies: IMovie[];

  constructor(
    private http: HttpClient,
    private tokenService: TokenService) {
  }


  // get categories from API
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('https://my-json-server.typicode.com/changcomchien/APIjson/category', this.httpOptions)
      .pipe(delay(50));
  }

  getCates(): Observable<ICategory[] | any> {
    return this.http.get<ICategory[]>('https://my-json-server.typicode.com/changcomchien/APIjson/category', this.httpOptions)
      .pipe(map(cates => {
        cates.map(ele => this.getMoviesByCategory(ele.name).subscribe(data => ele = data));
        console.log('Test: ');
        console.log(cates);
        return cates;
        }
      ));
  }


  // get a category from categories
  getACategory(name: string): Observable<ICategory | undefined> {
    return this.getCategories().pipe(
      map((cates: ICategory[]) => {
        console.log(cates);
        return cates.find(cate => cate.name === name);
      })
    );
  }


  // get phim theo category tu server
  getMoviesByCategoryAPI(name: string): Observable<IMovie[] | undefined> {
    return this.http.get<IMovie[]>(this.BASE_URL + 'movie/categories/' + name, this.httpOptions).pipe(delay(50));
  }


  // cần sửa bên backend cai get se tra ve category
  getMoviesByCategory(name: string): Observable<ICategory | undefined> {
    return forkJoin(this.getMoviesByCategoryAPI(name), this.getACategory(name)).pipe(
      map(([movies, cate]) => {
        cate.movies = movies;
        console.log(cate);
        return cate;
      })
    );
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
    return this.http.get<IMovie>(this.BASE_URL + 'movie/phim/' + slug, this.httpOptions).pipe(delay(50));
  }

}
