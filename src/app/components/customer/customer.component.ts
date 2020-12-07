import { Component, OnInit } from '@angular/core';
import { ClientType } from 'src/app/models/ClientType';
import { LoginService } from 'src/app/services/login.service';
import { SiteRouterService } from 'src/app/services/site-router.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(siteRouter: SiteRouterService) { 
    siteRouter.checkLoginCorrect(ClientType.Customer);
  }

  ngOnInit(): void {
  }

}
