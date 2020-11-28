import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {IMovie} from '../_shared/movie';

const AUTH_API = 'http://localhost:3000/admin/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public isAdmin = false;

  constructor(
    private http: HttpClient) {
  }

  login(payload): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', {
      email: payload.username,
      password: payload.password
    }, httpOptions);
  }

  // get all movies
  getMovies(): Observable<IMovie[] | undefined> {
    return this.http.get<IMovie[]>(AUTH_API, httpOptions).pipe(delay(50));
  }

  // Movie Service
  createMovie(payload): Observable<any> {
    console.log(payload);
    return this.http.post(AUTH_API + 'createMovie', {
      title: payload.title,
      year: payload.year,
      kind: payload.kind,
      category: payload.category.toString(),
      description: payload.description,
      source: payload.source,
      poster: payload.poster,
      imageSource: payload.imageSource,
      dateUpload: payload.dateUpload
    }, httpOptions);
  }

  updateMovie(payload): Observable<any> {
    console.log(`payload` + payload.imageSource + ' ' + payload.dateUpload);
    return this.http.post(AUTH_API + 'editMovie', {
      id: payload.id,
      title: payload.title,
      year: payload.year,
      kind: payload.kind,
      category: payload.category.toString(),
      description: payload.description,
      source: payload.source.toString(),
      poster: payload.poster,
      imageSource: payload.imageSource,
      dateUpload: payload.dateUpload
    }, httpOptions);
  }

  crawlMovie(): void {
    console.log('dit me may');
  }

  deleteMovie(chuoiid: string): Observable<any> {
    console.log(`Test: ${chuoiid}`);
    return this.http.post(AUTH_API + 'deleteMovie', {
      id: chuoiid
    }, httpOptions);
  }

}
