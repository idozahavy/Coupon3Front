import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { AlertComponent } from './components/modals/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'coupon3';

  constructor(private route: ActivatedRoute
    ,modals :NgbModal) {
    AlertComponent.initialize(modals);
  }
  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params.err))
      .subscribe((params) => {
        AlertComponent.open(params.title, params.err);
      });
  }
}
