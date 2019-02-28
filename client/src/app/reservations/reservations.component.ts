import { Component, OnInit, Input} from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import {HttpClientModule} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { UserService } from '../_services/user.service';
import { User } from '../user';
import { Book } from '../book';
import { BookService } from '../book.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  reservation: Reservation;
  books: Book[];
  //private isButtonVisible = false;
  @Input()
  users: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private auth: AuthService,
    private user: UserService,
    private bookService: BookService,
  ) {}

  newReservation(bookId: number) : Reservation {
    var reservation = new Reservation();
    reservation.id = bookId;
    reservation.book = '';
    reservation.user = '';
    reservation.date = '';
    return reservation;
  }

  onSubmit() : void {
    this.reservationService.addReservation(this.reservation)
      .subscribe(reservation => {
        this.reservations.unshift(reservation);
        this.reservation = this.newReservation(reservation.id);
      });
  }


  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
    this.getUser();
    this.getReservations();
    this.getBooks();

  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }

  getUser(): void {
    this.user.getById(1).subscribe(users => this.users = users);
  }

  redirect(): void {
    this.router.navigate(['/login']);
  }

  async delete(reservation: Reservation){
    this.reservations = this.reservations.filter(h => h !== reservation);
    await this.reservationService.deleteReservation(reservation).subscribe();
    location.reload();
  }

}
