import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css'],
})
export class CustomerModalComponent implements OnInit {
  customer = new Customer();
  actionType: ActionType;

  constructor(public modal: NgbActiveModal) {}

  public setCustomer(customer: Customer, actionType: ActionType) {
    for (const key in customer) {
      this.customer[key] = customer[key];
    }
    this.actionType = actionType;
  }

  ngOnInit(): void {}
}
