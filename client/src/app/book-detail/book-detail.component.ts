import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { BookService }  from '../book.service';
import { Book } from '../book';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input()
  book: Book;
  reservations: Reservation[];
  reservation: Reservation;
  users: User[];

  user: User;

  username = this.auth.username;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location,
    private reservationService: ReservationService,
    private auth: AuthService,
    private user1: UserService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
    this.user1.getAll()
      .subscribe(users => this.users = users);;
    this.getBook();
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let bookId = +params.get('id');
        this.reservation = this.newReservation(bookId,3);
        return this.reservationService.getReservations()
      }).subscribe(reservations => this.reservations = reservations);
  }


  reserve(ident: number): void {
    console.log(ident);
    this.reduce();
    this.reservation.user = ident;
    this.alertService.success("Successful reservation for: " + this.book.title);
    this.reservationService.addReservation(this.reservation)
      .subscribe(reservation => {
        this.reservations.unshift(reservation);
        this.reservation = this.newReservation(this.reservation.id,ident);
        this.alertService.success("Successful reservation for" + this.book.title);
        this.reservation.user = ident;
      });
  }

  newReservation(bookId: number, ident:number) : Reservation {
    var reservation = new Reservation();
    reservation.id = Math.floor((Math.random() * 100000) + 10);
    reservation.book = bookId.toString();
    reservation.user = ident;
    //console.log(this.auth.returnUser.toString());
    //console.log(this.user.getById(1).toString());
    return reservation;
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }

  check(){
    if (this.book.availability > 0)
      return true;
  }

  reduce(){
    if(this.check()){
      const avail = this.book.availability - 1;
      this.book.availability -= 1;
      this.bookService.updateBook(this.book)
        .subscribe();
      return this.book.availability;
    }
  }

  increase(){
      const avail = this.book.availability + 1;
      this.book.availability += 1;
      this.bookService.updateBook(this.book)
        .subscribe();
      return this.book.availability;
  }
  getReservations(): void {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations);
  }
}
