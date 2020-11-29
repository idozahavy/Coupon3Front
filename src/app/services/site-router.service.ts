import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
}
