import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { ErrorHandlingService } from '../errorhandling.service';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(
      private http: HttpClient,
      private message: MessageService,
      private eh: ErrorHandlingService) { }

    private booksUrl = 'api/allusers';

    users: User[];

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.booksUrl).pipe(
          tap(books => this.message.add(`fetched users`)),
          catchError(this.eh.handleError('getAll', []))
        );
    }

    getById(id: number) {
        return this.http.get(`http://127.0.0.1:4200/api/users/` + id);
    }

    register(user: User){
        return this.http.post(`http://127.0.0.1:4200/api/users/`, user);
    }

    delete(id: number) {
        return this.http.delete(`/api/users/` + id);
    }
}
