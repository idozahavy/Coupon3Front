import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  providers: [{provide: NgbModal,useClass: NgbModal}]
})
export class AlertComponent implements OnInit {

  static modalService: NgbModal;

  static initialize(modalService: NgbModal) { 
    AlertComponent.modalService = modalService;
  }

  public static open(title: string, body: string) {
    const modal = AlertComponent.modalService.open(AlertComponent, {ariaLabelledBy: 'modal-basic-title'});
    modal.componentInstance.title = title;
    modal.componentInstance.body = body;
  }

  @Input()
  body: string
  @Input()
  title: string

  constructor(public modal: NgbActiveModal, modalService: NgbModal) {
    AlertComponent.modalService = modalService;
   }

  ngOnInit(): void {
  }

}