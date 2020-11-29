import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Company } from '../models/Company';
import { Coupon } from '../models/Coupon';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private COMPANY_URL = 'http://localhost:8080/company';

  constructor(private server: HttpClient) {}

  addCoupon(coupon: Coupon): Observable<string> {
    return this.server.post<string>(this.COMPANY_URL + '/coupon', coupon);
  }

  deleteCoupon(id: number): Observable<string> {
    return this.server.delete<string>(this.COMPANY_URL + '/coupon/' + id);
  }

  updateCoupon(coupon: Coupon): Observable<string> {
    return this.server.put<string>(this.COMPANY_URL + '/coupon', coupon);
  }

  getDetails(): Observable<Company> {
    return this.server.get<Company>(this.COMPANY_URL);
  }

  getCoupons(param: {
    category: Category;
    maxPrice: number;
  }): Observable<Coupon[]> {
    let params = new HttpParams();
    for (let key in param) {
      params.set(key, param[key]);
    }
    return this.server.get<Coupon[]>(this.COMPANY_URL + '/coupons', { params });
  }
}
