import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private COUPONS_URL = 'http://localhost:8080/coupons/';
  private COUPONS_COUNT_URL = 'http://localhost:8080/couponsCount';


  constructor(private server: HttpClient) {}

  getCouponsPage(page: number, count: number=5): Observable<Coupon[]> {
    const params = new HttpParams().set('count', count.toString());
    return this.server.get<Coupon[]>(this.COUPONS_URL+page, {params: params});
  }

  getCouponsCount(): Observable<number> {
    return this.server.get<number>(this.COUPONS_COUNT_URL);
  }
}
