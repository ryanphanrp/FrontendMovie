import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { IUser } from '../_shared/User';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: IUser[] = [
    {
      username: 'tinhtute',
      email: 'therealtinhtute@gmail.com',
      password: '12345678',
      plan: 'premium'
    },
    {
      username: 'changcomchien',
      email: 'changcomchien@gmail.com',
      password: '12345678',
      plan: 'basic'
    }
  ];
  constructor() { }

  getUsers(): Observable<IUser[]> {
    return of(this.users).pipe(delay(50));
  }

  findUserByID(ID: string): Observable<IUser> {
    const user = this.users.find(item => item.username == ID);
    console.log(user);
    if(user){
      return of(user).pipe(delay(50));
    }
    return throwError(new Error('404 - User not found'));
  }
}
