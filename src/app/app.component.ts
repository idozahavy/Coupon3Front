import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertComponent } from './components/modals/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'coupon3';

  @ViewChild(AlertComponent)
  alert: AlertComponent;

  constructor(router: Router, private route: ActivatedRoute) {
    router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        // console.log('eve', event);
      });
  }
  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params.err))
      .subscribe((params) => {
        this.alert.open(params.title, params.err);
      });
  }
}
