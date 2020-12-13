import { Component, OnInit, Predicate } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { ClientType } from 'src/app/models/ClientType';
import { Coupon } from 'src/app/models/Coupon';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LoginService } from 'src/app/services/login.service';
import { SiteRouterService } from 'src/app/services/site-router.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer = new Customer();

  coupons: Coupon[];
  allCoupons: Coupon[];
  maxPrice: number;
  category: Category;
  categories = Object.keys(Category);

  couponsFilters = new Array<{id: string, filterMethod: Predicate<Coupon>}>();

  constructor(siteRouter: SiteRouterService, private customerService: CustomerService) { 
    siteRouter.checkLoginCorrect(ClientType.Customer);
    this.customerService.getDetails().subscribe((customer)=>{
      this.customer = customer;
      this.allCoupons = customer.coupons;
      this.coupons = customer.coupons;
    });
    this.categories.unshift('');
  }

  ngOnInit(): void {
  }

  onCategoryChange(){
    const cat = this.category;
    this.couponsFilters = this.couponsFilters.filter(filter => filter.id!=="category");
    if (cat) {
      const newFilter = {
        id:"category",
        filterMethod: (coup: Coupon) => coup.category === cat
        };
      this.couponsFilters.push(newFilter);
    }
  }

  onMaxPriceChange() {
    const mxPr = this.maxPrice;
    this.couponsFilters = this.couponsFilters.filter(filter => filter.id !== "maxPrice");
    if (mxPr) {
      const newFilter = {
        id:"maxPrice",
        filterMethod: (coup: Coupon) => coup.price <= mxPr
        };
      this.couponsFilters.push(newFilter);
    }
  }

  filterCoupons(): void {
    this.coupons = this.allCoupons;
    this.couponsFilters.forEach((filter)=>{
      this.coupons = this.coupons.filter(filter.filterMethod);
    })
  }

  resetFilters(): void {
    while(this.couponsFilters.length>0) {
      this.couponsFilters.pop();
    }
    this.maxPrice = undefined;
    this.category = undefined;
    this.filterCoupons();
  }

}
