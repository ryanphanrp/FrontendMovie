import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {IUser} from '../_shared/user';

const BASE_URL = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  getInformation(): Observable<any> {
    return this.http.get<IUser>(BASE_URL + 'users/information', httpOptions).pipe(delay(50));
  }

  updateInformation(payload): Observable<any> {
    return this.http.post(BASE_URL + 'users/updateinfor', {
      nickName: payload.userName
    }, httpOptions).pipe(delay(50));
  }

  createPayment(): Observable<any> {
    return this.http.get<any>(BASE_URL + 'payment/create_payment', httpOptions).pipe(delay(50));
  }

  returnPayment(query: string): Observable<any> {
    console.log(query);
    return this.http.get<any>(BASE_URL + 'payment/vnpay_ipn?' + query, httpOptions).pipe(delay(50));
  }

}
