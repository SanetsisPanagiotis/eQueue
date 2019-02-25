import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { Review } from './review';
import { Reservation } from './reservation';
import { Contact } from './contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Accept': 'application/json'})
};

@Injectable()
export class ReservationService {

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private eh: ErrorHandlingService
  ) { }

  getReservations(): Observable<Reservation[]> {
    let url = `api/reservations`;
    return this.http.get<Reservation[]>(url)
     .pipe(
       tap(reservations => this.message.add(`fetched reservations`)),
       catchError(this.eh.handleError('getReservations', []))
     );
  }
  /** POST: add a new reservation to the server*/
  addReservation(reservation: Reservation): Observable<Reservation> {
    let url = `api/reservations`;
    return this.http.post<Reservation>(url, reservation, httpOptions).pipe(
      tap((reservation: Reservation) => this.message.add(`added reservation`)),
      catchError(this.eh.handleError<Reservation>('addReservation'))
    );
  }

  /** DELETE: reserve from the server */
  deleteReservation (reservation: Reservation | number): Observable<Reservation> {
    const id = typeof reservation === 'number' ? reservation : reservation.id;
    let url1 = `api/reservations`;
    const url = ``;

    return this.http.delete<Reservation>(url, httpOptions).pipe(
      tap(_ => this.message.add(`deleted reservation id=${id}`)),
      catchError(this.eh.handleError<Reservation>('deleteReservation'))
    );
  }

}
