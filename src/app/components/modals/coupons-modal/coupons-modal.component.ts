import { Component, Input, OnInit } from '@angular/core';
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
  coupons = new Array<Coupon>();

  constructor(public modal: NgbActiveModal) {}

  public setCoupons(coupons: Coupon[]) {
    this.coupons = coupons;
  }

  ngOnInit(): void {}
}
