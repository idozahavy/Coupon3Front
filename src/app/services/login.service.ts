import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { LoginToken } from '../models/LoginToken';
import { debounceTime, filter, first, last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private LOGIN_URL = 'http://localhost:8080/login';

  private _loginToken: LoginToken;
  get loginToken() { return this._loginToken};
  set loginToken(value: LoginToken) { 
    this._loginToken = value;
    window.localStorage.setItem("coupons3-tkn",JSON.stringify(value));
  }

  deleteLoginToken() {
    this._loginToken = null;
    window.localStorage.removeItem("coupons3-tkn");
  }

  constructor(private server: HttpClient) {
    this._loginToken = JSON.parse(window.localStorage.getItem("coupons3-tkn"));
  }

  public login(email: string, password: string): Observable<LoginToken> {
    return this.server.post<LoginToken>(this.LOGIN_URL, { email, password });
  }

  public check(): Observable<boolean> {
    return this.server.get<boolean>(this.LOGIN_URL+"/check/"+this.loginToken.clientType);
  }

  public logout() : Observable<any> {
    return new Observable<any>(
      (sub) => {
        const subNext = () => {sub.next();sub.complete;};
        if (this.loginToken){
          const ob = this.server.delete<any>(this.LOGIN_URL)
          ob.subscribe(()=>{
            this.deleteLoginToken();
            subNext();
          }, subNext);
        } else {
          subNext();
        }
      }
    );
  }
}
