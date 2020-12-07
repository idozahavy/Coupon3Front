import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private COUPONS_URL = 'http://localhost:8080/coupons/';

  constructor(private server: HttpClient) {}

  getCouponsPage(page: number): Observable<Coupon[]> {
    return this.server.get<Coupon[]>(this.COUPONS_URL+page);
  }
}
