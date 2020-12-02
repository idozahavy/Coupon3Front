import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Coupon } from 'src/app/models/Coupon';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.component.html',
  styleUrls: ['./coupon-modal.component.css'],
})
export class CouponModalComponent implements OnInit {
  actionType: ActionType;
  coupon = new Coupon();

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  setCoupon(coupon: Coupon, actionType: ActionType) {
    for (const key in coupon) {
      this.coupon[key] = coupon[key];
    }
    this.actionType = actionType;
  }
}
