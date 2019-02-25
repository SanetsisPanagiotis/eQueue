import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../errorhandling.service';

import { AuthService } from '../auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../user';
import { AlertService } from '../_services/alert.service';
import 'rxjs/add/operator/catch';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
  private auth: AuthService,
  private eh: ErrorHandlingService,
  private router: Router,
  private userS: UserService,
  private formBuilder: FormBuilder,
  private alertService: AlertService,
) { }

  register;
  messageForm: FormGroup;
  submitted = false;
  success = false;
  vara = false;
  errors: String;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  ngOnInit() {
      this.register = {
        username:'',
        password1:'',
        password2:'',
        email:''
      };
      this.messageForm = this.formBuilder.group({
        username: ['', Validators.required],
        password1: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
      }, {
        validator: MustMatch('password1', 'password2')
      });
  }

  redirect(): void {
    this.router.navigate(['/']);
  }

  registerUser(username, email, password1, password2) {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;}
    this.vara = true;
    this.success = true;


    this.userS.register(this.register).subscribe(response => {
      alert('user created: ' + this.register.username)
    },
    error=> {
      console.log(error);
      this.errors = error;
    });
    if(!this.errors){
      this.router.navigate(['/login']);
      this.alertService.success('Successfully Registered');
    } else {
      this.alertService.error('Error while registering. Try again.\n1) Your password cannot be too similar to your other personal information.\n2) Your password must contain at least 8 characters.\n3) Your password cannot be a commonly used password.\n4) Your password cannot be entirely numeric.');
    }
  }


}
