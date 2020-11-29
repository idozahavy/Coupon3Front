import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { Customer } from '../models/Customer';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private ADMIN_URL = 'http://localhost:8080/admin';

  constructor(private loginService: LoginService, private server: HttpClient) {}

  addCompany(company: Company): Observable<string> {
    return this.server.post<string>(this.ADMIN_URL + '/company', company);
  }

  deleteCompany(id: number): Observable<string> {
    return this.server.delete<string>(this.ADMIN_URL + '/company/' + id);
  }

  updateCompany(company: Company): Observable<string> {
    return this.server.put<string>(this.ADMIN_URL + '/company', company);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.server.get<Company[]>(this.ADMIN_URL + '/company/all');
  }

  getCompany(id: number): Observable<Company> {
    return this.server.get<Company>(this.ADMIN_URL + '/company/' + id);
  }

  //////////////////////////////////////////////////////////////////////

  addCustomer(customer: Customer): Observable<string> {
    return this.server.post<string>(this.ADMIN_URL + '/customer', customer);
  }

  deleteCustomer(id: number): Observable<string> {
    return this.server.delete<string>(this.ADMIN_URL + '/customer/' + id);
  }

  updateCustomer(customer: Customer): Observable<string> {
    return this.server.put<string>(this.ADMIN_URL + '/customer', customer);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.server.get<Customer[]>(this.ADMIN_URL + '/customer/all');
  }

  getCustomer(id: number): Observable<Customer> {
    return this.server.get<Customer>(this.ADMIN_URL + '/customer/' + id);
  }
}
