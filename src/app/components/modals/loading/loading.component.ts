import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  boo: string;

  constructor(gg : NgbActiveModal,hh : NgbModalConfig) {
    console.log("hh",hh);
    console.log("gg",gg);
    
   }

  ngOnInit(): void {
    console.log("boo",this.boo);
    
  }

}
