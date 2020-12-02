import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/modals/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CompanyComponent } from './components/company/company.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CustomerModalComponent } from './components/modals/customer-modal/customer-modal.component';
import { CompanyModalComponent } from './components/modals/company-modal/company-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CouponsModalComponent } from './components/modals/coupons-modal/coupons-modal.component';
import { CouponModalComponent } from './components/modals/coupon-modal/coupon-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    AdminComponent,
    CustomerComponent,
    CompanyComponent,
    LoginComponent,
    CustomerModalComponent,
    CompanyModalComponent,
    CouponsModalComponent,
    CouponModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
