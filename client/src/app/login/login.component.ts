import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';
import { catchError } from 'rxjs/operators';

import { ErrorHandlingService } from '../errorhandling.service';
import { AuthService } from '../auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  message: string;
  messageForm: FormGroup;
  submitted = false;
  success = false;
  vara = false;
  useri;

  constructor(
    private auth: AuthService,
    private eh: ErrorHandlingService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) { }

  login(username, password) {

    this.auth.login(username, password)
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/']);
        }
    });this.alertService.success("Success, wait 1 second until redirection");
  }


  ngOnInit() {
    this.useri = {
      username:'',
      password:'',
    };
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;}
    this.login(this.useri.username, this.useri.password);
  }

  logout() {
    this.auth.logout();
  }
}
