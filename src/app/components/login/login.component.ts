import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoginCred } from 'src/app/models/LoginCred';
import { LoginService } from 'src/app/services/login.service';
import { SiteRouterService } from 'src/app/services/site-router.service';
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

  constructor(private loginService: LoginService, private router: Router, siteRouter: SiteRouterService) {
    if (loginService.loginToken) {
      siteRouter.alreadyLoggedIn();
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
          this.loginService.loginToken = res;
          this.router.navigate(['/'+res.clientType.toLowerCase()]);
        },
        (err: HttpErrorResponse) => {
          switch (err.status){
            case 400:
              this.subject.next("can not log you in, incorrect email/password");
              break;
            default:
              console.error("Login error",err);
              this.subject.next(err.message);
          }
        }
      );
  }
}
