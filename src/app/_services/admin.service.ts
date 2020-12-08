import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ICategory, IMovie} from '../_shared/movie';
import {IUser} from '../_shared/user';

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
    return this.http.post(AUTH_API + 'login', {
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
    console.log(payload);
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
    console.log('test');
  }

  deleteMovie(chuoiid: string): Observable<any> {
    return this.http.post(AUTH_API + 'deleteMovie', {
      id: chuoiid
    }, httpOptions);
  }

  createCategory(payload): Observable<any> {
    return this.http.post(AUTH_API + 'categories/add', {
      Category: payload.category
    }, httpOptions);
  }

  // get categories from API
  getCategories(): Observable<ICategory[] | undefined> {
    return this.http.get<ICategory[]>(AUTH_API + 'categories/getcategories', httpOptions)
      .pipe(delay(50));
  }

  updateCategory(payload): Observable<any> {
    return this.http.post(AUTH_API + 'categories/edit', {
      id: payload.id,
      category: payload.category
    }, httpOptions);
  }

  deleteCategory(payload: string): Observable<any> {
    return this.http.post(AUTH_API + 'categories/delete', {
      id: payload
    }, httpOptions);
  }

  getUsers(): Observable<any | undefined> {
    return this.http.get<any>(AUTH_API + 'manageuser', httpOptions).pipe(delay(50));
  }

  createUser(payload): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', {
      nickname: payload.nickname,
      email: payload.email,
      password: payload.password,
      confirm_password: payload.password
    }, httpOptions);
  }

  updateUser(payload): Observable<any> {
    return this.http.post(AUTH_API + 'edituser', {
      nickname: payload.nickname,
      email: payload.email,
      password: payload.password,
      dateCreate: payload.dateCreate,
      plan: payload.plan
    }, httpOptions);
  }

  deleteUser(dayload): Observable<any> {
    return this.http.post(AUTH_API + 'deleteUser', {
      id: dayload,
    }, httpOptions);
  }

  // payment
  getPaymentList(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'listpayment', httpOptions).pipe(delay(50));
  }

  deletePayment(payload): Observable<any> {
    return this.http.post(AUTH_API + 'deletePayment', {
      id: payload.id,
    }, httpOptions);
  }

}
