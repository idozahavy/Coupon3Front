import { Component, OnInit } from '@angular/core';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Coupon } from 'src/app/models/Coupon';

@Component({
  selector: 'app-coupons-modal',
  templateUrl: './coupons-modal.component.html',
  styleUrls: ['./coupons-modal.component.css']
})
export class CouponsModalComponent implements OnInit {
  updateIcon = faPenSquare;
  deleteIcon = faTrash;

  coupons = new Array<Coupon>();
  actionType: ActionType;

  constructor(public modal: NgbActiveModal) {}

  public setCoupons(coupons: Coupon[], actionType: ActionType) {
    this.coupons = coupons;
    this.actionType = actionType;
  }

  ngOnInit(): void {}

  couponDeleteButton(coupon: Coupon):void{
    console.log("mockup coupon deleted",coupon);
  }
  couponUpdateButton(coupon: Coupon):void{
    console.log("mockup coupon updated",coupon);
  }
}
