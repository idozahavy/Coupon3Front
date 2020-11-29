import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoginCred } from 'src/app/models/LoginCred';
import { LoginService } from 'src/app/services/login.service';
// import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginCred = new LoginCred('', '');
  subject = new Subject<string>();

  failMessage: string;

  constructor(private loginService: LoginService, private router: Router) {
    if (loginService.loginToken) {
      console.log("logged in");
      router.navigate(['/'], {
        queryParams: {
          title: 'Login Error',
          err: 'You are already logged in, please first log out to log in',
        },
      });
    }
  }

  ngOnInit(): void {
    this.subject.subscribe((err) => {
      this.failMessage = err;
    });
    this.subject.pipe(debounceTime(10000)).subscribe(() => {
      this.failMessage = '';
    });
  }

  onSubmit() {
    this.loginService
      .login(this.loginCred.email, this.loginCred.password)
      .subscribe(
        (res) => {
          console.log("got token "+res.token);
          this.loginService.loginToken = res;
          this.router.navigate(['/'+res.clientType.toLowerCase()]);
        },
        (err: HttpErrorResponse) => {
          switch (err.status){
            case 400:
              this.subject.next("can not log you in, incorrect email/password");
              break;
            default:
              this.subject.next(err.message);
          }
        }
      );
  }
}
