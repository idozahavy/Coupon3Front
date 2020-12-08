import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private CUSTOMER_URL = 'http://localhost:8080/customer/';

  constructor(private server: HttpClient) {}

  purchaseCoupon(coupon: Coupon): Observable<any> {
    return this.server.post<any>(this.CUSTOMER_URL + 'coupon', coupon);
  }

  getDetails(): Observable<Customer>{
    return this.server.get<Customer>(this.CUSTOMER_URL);
  }
}
