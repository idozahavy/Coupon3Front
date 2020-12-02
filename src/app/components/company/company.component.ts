import { Component, OnInit, ViewChild } from '@angular/core';
import { faPenSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Category } from 'src/app/models/Category';
import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';
import { SiteRouterService } from 'src/app/services/site-router.service';
import { AlertComponent } from '../modals/alert/alert.component';
import { CouponModalComponent } from '../modals/coupon-modal/coupon-modal.component';
import { CouponsModalComponent } from '../modals/coupons-modal/coupons-modal.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {

  createIcon = faPlusSquare;
  updateIcon = faPenSquare;
  deleteIcon = faTrash;

  categories = [
    { cat: '', name: '' },
    { cat: Category.Food, name: 'Food' },
    { cat: Category.Electricity, name: 'Electricity' },
    { cat: Category.Restaurant, name: 'Restaurant' },
    { cat: Category.Vacation, name: 'Vacation' },
    { cat: Category.Technology, name: 'Technology' },
    { cat: Category.Computers, name: 'Computers' },
    { cat: Category.AI, name: 'AI' },
  ];
  coupons: Coupon[];
  maxPrice: number;
  category: Category;

  @ViewChild(AlertComponent)
  alert: AlertComponent;

  constructor(
    private service: CompanyService,
    private modals: NgbModal,
    login: LoginService,
    siteRouter: SiteRouterService
  ) {
    if (!login.loginToken) {
      console.log('no loginToken');
      siteRouter.notLoggedIn();
    } else {
      if (login.loginToken.clientType !== 'Company') {
        console.log('not company type');
        siteRouter.noPermission();
      }
      console.log('login check');

      login.check().subscribe(
        (res) => {
          console.log('login check res', res);
          if (!res) {
            console.log('not valid token');
            siteRouter.notLoggedIn();
          }
        },
        (err) => {
          siteRouter.notLoggedIn();
        }
      );
    }
  }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons() {
    this.service
      .getCoupons({
        category: this.category,
        maxPrice: this.maxPrice,
      })
      .subscribe(
        (res) => {
          this.coupons = res;
        },
        (err) => {
          console.log('423 - error getting coupons', err);
        }
      );
  }

  couponAddButton() {
    const couponModal = this.modals.open(CouponModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    couponModal.closed.subscribe((coupon) => {
      this.service.addCoupon(coupon).subscribe(
        () => {
          this.getCoupons();
        },
        (err) => {
          console.log(err);
          this.alert.open('Coupon creation error', err.error);
        }
      );
    });
    couponModal.componentInstance.setCoupon(null, ActionType.Create);
  }

  couponDeleteButton(coupon: Coupon){
    if (confirm(`are you sure you want to delete coupon ${coupon.title}?`)) {
      this.service.deleteCoupon(coupon.id).subscribe(() => {
        this.coupons = this.coupons.filter((coup) => coup.id !== coupon.id);
      }, (err) => {
        this.alert.open("Coupon deletion error",err.error);
      });
    }
  }
  couponUpdateButton(coupon: Coupon){

  }
}
