import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { apiUrl} from './index';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';
import { AlertService } from './_services/alert.service';


import 'rxjs/add/operator/toPromise';

import { Headers, Http } from '@angular/http';

class Credentials {
  constructor(public username: string, public password: string) {}}

class Credentials2{
  constructor(public username:string, public email: string, public password: string ){}
}

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };
@Injectable()
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  isLoggedIn: boolean = false;
  username: string;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService,
    private alertService: AlertService,
  ) {
  }

  login(username, password) : Observable<boolean> {
    const authUrl = `api-token-auth/`;

    var credentials = new Credentials(username, password);
    return this.http
      .post(authUrl, credentials, httpOptions).pipe(
        map(results => {
          if (results['token']) {
            localStorage.setItem('bangular-jwt-token', results['token']);
            localStorage.setItem('username', username);
            this.isLoggedIn = true;
            this.username = username;
            this.message.add(`User ${username} logged in`);

            var start = new Date().getTime();
            var end = start;
            while(end < start + 1500) {
              end = new Date().getTime();
            }
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.eh.handleError<boolean>(`login username=${username}`,
          false))
      );
  }
  registerUser(userData): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/users', userData);
  }

  returnUser(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/users');
  }

  register(username, email, password): Observable<any>{
		let url: string = 'rest-auth/register/';
    let user = new User(username,email,password);
    var credentials = new Credentials2(username, email,password);
    console.log("ekei");
		return this.http.post('http://127.0.0.1:8000/api/users/', JSON.stringify(credentials));}

  logout(): void {
    this.isLoggedIn = false;
    this.message.add(`User ${this.username} logged out`);
    this.username = null;
    localStorage.removeItem('bangular-jwt-token');


  }

}
