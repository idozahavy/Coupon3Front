import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/models/ClientType';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = false;

  ClientType = ClientType;

  @ViewChild('toggler')
  toggler: ElementRef;

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  toggleCollapse(){
    this.isCollapsed=!this.isCollapsed;
  }

  isToggleVisible(): boolean {
    return this.toggler === undefined || this.toggler.nativeElement.clientHeight>1;
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
