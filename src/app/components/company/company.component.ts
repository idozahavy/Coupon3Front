import { Component, OnInit, Predicate, ViewChild } from '@angular/core';
import { faPenSquare, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Category } from 'src/app/models/Category';
import { ClientType } from 'src/app/models/ClientType';
import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from 'src/app/services/company.service';
import { SiteRouterService } from 'src/app/services/site-router.service';
import { AlertComponent } from '../modals/alert/alert.component';
import { CouponModalComponent } from '../modals/coupon-modal/coupon-modal.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {

  createIcon = faPlusSquare;
  updateIcon = faPenSquare;
  deleteIcon = faTrash;

  coupons: Coupon[];
  allCoupons: Coupon[];
  maxPrice: number;
  category: Category;
  categories = Object.keys(Category);

  couponsFilters = new Array<{id: string, filterMethod: Predicate<Coupon>}>();

  @ViewChild(AlertComponent)
  alert: AlertComponent;

  constructor(
    private service: CompanyService,
    private modals: NgbModal,
    siteRouter: SiteRouterService
  ) {
    siteRouter.checkLoginCorrect(ClientType.Company);
    this.categories.unshift('');
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
          this.allCoupons = res;
          this.coupons = res;
          this.filterCoupons();
        },
        (err) => {
          AlertComponent.open('error getting coupons', err);
        }
      )
    ;
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

  couponAddButton() {
    const couponModal = this.modals.open(CouponModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
    });
    couponModal.closed.subscribe((coupon) => {
      this.service.addCoupon(coupon).subscribe(() => {
          this.getCoupons();
        }, (err) => {
          console.log(err);
          AlertComponent.open('Coupon creation error', err.error);
        }
      );
    });
    couponModal.componentInstance.setCoupon(null, ActionType.Create);
  }

  couponDeleteButton(coupon: Coupon){
    if (confirm(`are you sure you want to delete coupon ${coupon.title}?`)) {
      this.service.deleteCoupon(coupon.id).subscribe(() => {
        this.allCoupons = this.allCoupons.filter((coup) => coup.id !== coupon.id);
        this.filterCoupons();
      }, (err) => {
        AlertComponent.open("Coupon deletion error",err.error);
      });
    }
  }
  couponUpdateButton(coupon: Coupon){
    const couponModal = this.modals.open(CouponModalComponent,{ariaLabelledBy: 'modal-basic-title'});
    couponModal.closed.subscribe((editedCoupon) => {
      this.service.updateCoupon(editedCoupon).subscribe(() => {
        this.getCoupons();
      }, (err) => {
        AlertComponent.open("Coupon update error",err.error);
        }
      )
    });
    couponModal.componentInstance.setCoupon(coupon, ActionType.Edit);
  }
}
