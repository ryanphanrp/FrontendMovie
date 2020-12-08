import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized = false;

  constructor(private http: HttpClient) {
  }

  login(payload): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: payload.email,
      password: payload.password
    }, httpOptions);
  }

  register(payload): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      nickname: payload.nickname,
      email: payload.email,
      password: payload.password,
      confirm_password: payload.confirm
    }, httpOptions);
  }

  resetPassword(payload): Observable<any> {
    return this.http.post(AUTH_API + 'reset', {
      email: payload.email
    }, httpOptions);
  }

  newPassword(payload): Observable<any> {
    return this.http.post(AUTH_API + 'newpassword', {
      token: payload.token,
      password: payload.password
    }, httpOptions);
  }

  changePassword(payload): Observable<any> {
    return this.http.post(AUTH_API + 'changepassword', {
      password: payload.password
    }, httpOptions);
  }

}
