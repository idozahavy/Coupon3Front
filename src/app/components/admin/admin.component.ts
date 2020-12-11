import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActionType } from 'src/app/models/ActionType';
import { Company } from 'src/app/models/Company';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { SiteRouterService } from 'src/app/services/site-router.service';
import { AlertComponent } from '../modals/alert/alert.component';
import { CompanyModalComponent } from '../modals/company-modal/company-modal.component';
import { faPlusSquare, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/models/Customer';
import { CustomerModalComponent } from '../modals/customer-modal/customer-modal.component';
import { Coupon } from 'src/app/models/Coupon';
import { CouponsModalComponent } from '../modals/coupons-modal/coupons-modal.component';
import { ClientType } from 'src/app/models/ClientType';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  createIcon = faPlusSquare;
  updateIcon = faPenSquare;
  deleteIcon = faTrash;

  companies = new Array<Company>();
  customers = new Array<Customer>();

  @ViewChild(AlertComponent)
  alert: AlertComponent;

  constructor(
    siteRouter: SiteRouterService,
    public adminService: AdminService,
    public modals: NgbModal
  ) {
    siteRouter.checkLoginCorrect(ClientType.Admin);
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getCustomers();
  }

  getCompanies() {
    this.adminService.getAllCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }
  getCustomers() {
    this.adminService.getAllCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  //////////////////////// Companies

  companyDeleteButton(company: Company): void {
    if (confirm(`are you sure you want to delete company ${company.name}?`)) {
      this.adminService.deleteCompany(company.id).subscribe(() => {
        this.companies = this.companies.filter((com) => com.id !== company.id);
      }, (err) => {
        AlertComponent.open("Company deletion error",err.error);
      });
    }
  }

  companyUpdateButton(company:Company):void {
    const companyModal = this.modals.open(CompanyModalComponent,{ariaLabelledBy: 'modal-basic-title'})
    companyModal.closed.subscribe((company)=>{
      this.adminService.updateCompany(company).subscribe(()=>{
        this.getCompanies();
      }, (err)=>{
        console.log(err);
        AlertComponent.open("Company update error",err.error);
      });
      console.log("updated company",company);
    });
    // maybe will make an error if component cant load fast enough
    companyModal.componentInstance.setCompany(company, ActionType.Update);
  }

  companyAddButton():void {
    const companyModal = this.modals.open(CompanyModalComponent,{ariaLabelledBy: 'modal-basic-title'})
    companyModal.closed.subscribe((company)=>{
      this.adminService.addCompany(company).subscribe(()=>{
        this.getCompanies();
      }, (err)=>{
        console.log(err);
        AlertComponent.open("Company creation error",err.error);
      })
    });
    companyModal.componentInstance.setCompany(null, ActionType.Create);
  }

  //////////////////////// Customers

  customerDeleteButton(customer: Customer): void {
    if (confirm(`are you sure you want to delete customer '${customer.firstName} ${customer.lastName}'?`)) {
      this.adminService.deleteCustomer(customer.id).subscribe(() => {
        this.customers = this.customers.filter((cus) => customer.id !== cus.id);
      }, (err) => {
        AlertComponent.open("Customer deletion error",err.error);
      });
    }
  }

  customerUpdateButton(customer: Customer):void {
    const customerModal = this.modals.open(CustomerModalComponent,{ariaLabelledBy: 'modal-basic-title'})
    customerModal.closed.subscribe((customer)=>{
      this.adminService.updateCustomer(customer).subscribe(()=>{
        this.getCustomers();
      }, (err)=>{
        console.log(err);
        AlertComponent.open("Customer update error",err.error);
      });
      console.log("updated customer",customer);
    });
    // maybe will make an error if component cant load fast enough
    customerModal.componentInstance.setCustomer(customer, ActionType.Update);
  }

  customerAddButton():void {
    const customerModal = this.modals.open(CustomerModalComponent,{ariaLabelledBy: 'modal-basic-title'})
    customerModal.closed.subscribe((customer)=>{
      this.adminService.addCustomer(customer).subscribe(()=>{
        this.getCustomers();
      }, (err)=>{
        console.log(err);
        AlertComponent.open("Customer creation error",err.error);
      })
    });
    customerModal.componentInstance.setCustomer(null, ActionType.Create);
  }

  ////////////////////////

  viewCoupons(coupons: Coupon[]){
    const couponsModal = this.modals.open(CouponsModalComponent,{windowClass:"modal-dialog-table",ariaLabelledBy: 'modal-basic-title'});
    couponsModal.componentInstance.setCoupons(coupons);
  }
}
