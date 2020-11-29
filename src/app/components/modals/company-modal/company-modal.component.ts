import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.css'],
})
export class CompanyModalComponent implements OnInit {
  company: Company = new Company();
  actionType: ActionType;

  constructor(public modal: NgbActiveModal) {}

  public setCompany(company: Company, actionType: ActionType) {
    for (const key in company) {
      this.company[key] = company[key];
    }
    this.actionType = actionType;
  }

  ngOnInit(): void {}
}
