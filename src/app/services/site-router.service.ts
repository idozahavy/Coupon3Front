import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientType } from '../models/ClientType';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class SiteRouterService {
  constructor(private router: Router, private loginService: LoginService) {}
  noPermission() {
    this.router.navigate(['/'], {
      queryParams: {
        title: 'Permission Error',
        err: 'You do not have permission to go to that page',
      },
    });
  }
  notLoggedIn() {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          title: 'Login Error',
          err: 'You need to log in first.',
        },
      });
    });
  }
  checkLoginCorrect(clientType: ClientType) {
    if (!this.loginService.loginToken) {
      console.log('no loginToken');
      this.notLoggedIn();
    } else {
      if (this.loginService.loginToken.clientType !== clientType) {
        console.log(`not ${clientType} type`);
        this.noPermission();
      }
      console.log('login check');

      this.loginService.check().subscribe(
        (res) => {
          console.log('login check res', res);
          if (!res) {
            console.log('not valid token');
            this.notLoggedIn();
          }
        },
        (err) => {
          this.notLoggedIn();
        }
      );
    }
  }
}
