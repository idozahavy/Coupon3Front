import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientType } from 'src/app/models/ClientType';
import { Coupon } from 'src/app/models/Coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  today :Date;
  page: number;
  coupons: Coupon[];
  isCustomer: boolean;

  constructor(private route: ActivatedRoute, loginService: LoginService, couponsService: CouponsService) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.route.params.subscribe(params => {
      this.page = params.page;
      couponsService.getCouponsPage(this.page).subscribe((res)=>{
        this.coupons = res;
      }, (err)=>{
        console.log("could not obtain coupons page",err);
      })
    },(err)=>{
      console.log("no page param found",err);
    });
    if (loginService.loginToken && loginService.loginToken.clientType === ClientType.Customer){
      loginService.check().subscribe((res) => {
        this.isCustomer = res;
      });
    }
  }

  ngOnInit(): void {
  }

  compareDates(date1: Date, date2: Date){
    if (typeof date1 === "string"){
      date1 = new Date(date1);
    }
    if (typeof date2 === "string"){
      date2 = new Date(date2);
    }
    return date1.getTime()-date2.getTime();
  }

}
