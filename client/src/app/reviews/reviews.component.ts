import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../review';
import { ReviewService } from '../review.service';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})

export class ReviewsComponent implements OnInit {

  messageForm: FormGroup;
  reviews: Review[];
  submitted = false;
  vara = false;
  review: Review;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private auth: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }

    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      grade: ['', Validators.required],
      text: ['', Validators.required],
    });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let bookId = +params.get('id');
        this.review = this.newReview(bookId);
        return this.reviewService.getReviews(+params.get('id'))
      }).subscribe(reviews => this.reviews = reviews);
  }

  newReview(bookId: number) : Review {
    var review = new Review();
    review.book = bookId;

    return review;
  }

  onSubmit() : void {

    this.submitted = true;
    if (this.messageForm.invalid) {
        return;}
    this.vara = true;
    this.reviewService.addReview(this.review)
      .subscribe(review => {
        this.reviews.unshift(review);
        this.review = this.newReview(review.book);
      });
  }


}
