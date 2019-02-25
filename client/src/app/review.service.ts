import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Review } from './review';
import { Contact } from './contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Accept': 'application/json'})
};

@Injectable()
export class ReviewService {

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  /** GET reviews from the server */
  getReviews(bookId: number): Observable<Review[]> {
    let url = `api/restaurants/${bookId}/reviews`;
    return this.http.get<Review[]>(url)
      .pipe(
        tap(reviews => this.message.add(`fetched reviews`)),
        catchError(this.eh.handleError('getReviews', []))
      );
  }

  /** POST: add a new review to the server */
  addReview(review: Review): Observable<Review> {
    let url = `api/restaurants/${review.book}/reviews`;
    return this.http.post<Review>(url, review, httpOptions).pipe(
      tap((review: Review) => this.message.add(`added review w/ id=${review.id}`)),
      catchError(this.eh.handleError<Review>('addReview'))
    );
  }

  registerContact1(contact: Contact){
      return this.http.post(`http://127.0.0.1:4200/api/contact/`, contact);
  }


  registerContact(contact: Contact): Observable<Contact> {

    return this.http.post<Contact>(`/api/contact/`, contact, httpOptions).pipe(
      tap((contact: Contact) => this.message.add(`added contact`))
    );
  }
}
