import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../_services/user.service';
import { ReviewService } from '../review.service';
import { User } from '../user';
import { Contact } from '../contact';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  vara = false;

  users: User[];
  contact: Contact;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private user: UserService,
    private review: ReviewService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  getUsers(): void {
    this.user.getAll()
      .subscribe(users => this.users = users);
  }

  getContact(): void {
    this.review.registerContact(this.contact)
      .subscribe(contact => this.contact = contact);
  }

  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
    this.contact = {
      title:'',
      text:'',
    };
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;}
    this.vara = true;
    this.success = true;
    this.getContact();
  }

  redirect(): void {
    this.router.navigate(['/login']);
  }

  alert(): void {
    this.router.events.subscribe(event => {this.alertService.error("Contact Success");});
  }
}
