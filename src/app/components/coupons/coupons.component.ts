import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientType } from 'src/app/models/ClientType';
import { Coupon } from 'src/app/models/Coupon';
import { CouponsService } from 'src/app/services/coupons.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';
import { AlertComponent } from '../modals/alert/alert.component';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  customerCoupons: Coupon[] = [];

  today :Date;
  page: number;
  coupons: Coupon[] = [];
  couponRequestCount: number;
  totalAvailableCoupons: number;
  isCustomer: boolean;

  @ViewChild(AlertComponent)
  alert : AlertComponent;

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService,
     loginService: LoginService, couponsService: CouponsService) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    couponsService.getCouponsCount().subscribe((totalCount)=>{
      this.totalAvailableCoupons = totalCount;
    })
    this.route.queryParams.subscribe(params => {
      this.page = Number(params.p);
      if (!this.page || this.page < 0){
        return router.navigate(['coupons'], {queryParams: {p:1}, queryParamsHandling:"merge"});
      }
      const count = Number(params.c);
      this.couponRequestCount = count || 5;
      if (this.couponRequestCount<1){
        return router.navigate(['coupons'], {queryParams: {c:null}, queryParamsHandling:"merge"});
      }
      if (this.couponRequestCount>20) {
        return router.navigate(['coupons'], {queryParams: {c:20}, queryParamsHandling:"merge"});
      }

      couponsService.getCouponsPage(this.page, this.couponRequestCount).subscribe((coupons)=>{
        if (coupons && coupons.length<1){
          console.log("no coupons");
          return this.router.navigate(['coupons'], {queryParams: {p:1}, queryParamsHandling:"merge"});
        }
        this.coupons = coupons;
      }, (err)=>{
        console.log("could not obtain coupons page",err);
      })
    },(err)=>{
      console.log("no page param found",err);
    });
    if (loginService.loginToken && loginService.loginToken.clientType === ClientType.Customer){
      loginService.check().subscribe((res) => {
        this.isCustomer = res;
        this.customerService.getDetails().subscribe((customer)=>{
          this.customerCoupons = customer.coupons;
        }, (err)=>{
          this.alert.open("CustomerDetails Error", err.error.message);
        })
      });
    }
  }

  ngOnInit(): void {
  }

  onCouponCountChange() {
    this.router.navigate(['coupons'], {queryParams: {c:this.couponRequestCount}, queryParamsHandling:"merge"});
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

  customerHasCoupon(coupon: Coupon){
    return this.customerCoupons.some((coup)=>coup.id===coupon.id);
  }

  purchaseCoupon(coupon: Coupon){
    this.customerService.purchaseCoupon(coupon).subscribe(()=>{
      this.customerService.getDetails().subscribe((customer)=>{
        this.customerCoupons = customer.coupons;
      }, (err)=>{
        this.alert.open("CustomerDetails Error", err.error.message);
      })
    }, (err) => {
      console.log("purchaseCoupon error", err);
      this.alert.open('Purchase Error', err.error.message);
    })
  }

}
