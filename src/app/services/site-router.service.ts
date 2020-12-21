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
      this.notLoggedIn();
    } else {
      if (this.loginService.loginToken.clientType !== clientType) {
        this.noPermission();
      }

      this.loginService.check().subscribe(
        (res) => {
          if (!res) {
            this.notLoggedIn();
          }
        },
        (err) => {
          this.notLoggedIn();
        }
      );
    }
  }

  alreadyLoggedIn() {
    this.router.navigate(['/'], {
      queryParams: {
        title: 'Login Error',
        err: 'You are already logged in, please first log out to log in',
      },
    });
  }
}
