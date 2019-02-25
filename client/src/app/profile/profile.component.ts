import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  headers={headers: new HttpHeaders({'Content-Type': 'application/json'})}

  @Input()
  users: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private user: UserService,
    private http: HttpClient,
  ) {
  }

  getUsers(): void {
    this.user.getAll()
      .subscribe(users => this.users = users);
  }

  ngOnInit() {
    if(localStorage.getItem('bangular-jwt-token')){
      this.auth.isLoggedIn = true;
      this.auth.username = localStorage.getItem('username');
    }
    this.getUser();
    this.getUsers();
  }

  getUser(): void {
    this.user.getById(1).subscribe(users => this.users = users);
  }

  onSubmit() {}

  selectedFile: File

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload(id:number) {
    this.http.post('http://127.0.0.1:4200/api/users/img/' + id, this.selectedFile, {
    reportProgress: true,
    observe: 'events'
    })
    .subscribe(event => {
      console.log(event); // handle event here
    });
  }

  redirect(): void {
    this.router.navigate(['/login']);
  }

}
