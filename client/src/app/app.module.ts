import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { ItalicsDirective } from './italics.directive';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookService } from './book.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ErrorHandlingService } from './errorhandling.service';

import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AlertComponent } from './_services/alert.component';

import { ReviewService } from './review.service';
import { AuthService } from './auth.service';
import { ReservationService } from './reservation.service';
import { UserService } from './_services/user.service';
import { AlertService } from './_services/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    ItalicsDirective,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BookSearchComponent,
    ReviewsComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    ProfileComponent,
    ReservationsComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    BookService,
    MessageService,
    ErrorHandlingService,
    ReviewService,
    UserService,
    AuthService,
    ReservationService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
