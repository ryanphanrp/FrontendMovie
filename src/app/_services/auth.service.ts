import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const AUTH_API = 'http://localhost:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public isAuthorized = false;

  constructor(private http: HttpClient) { }

  login(payload): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email: payload.email,
      password: payload.password
    }, httpOptions);
  }

  register(payload): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email: payload.email,
      password: payload.password,
      confirm_password: payload.confirm_password
    }, httpOptions);
  }

}
