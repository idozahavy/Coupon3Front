import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsModalComponent } from './coupons-modal.component';

describe('CouponsModalComponent', () => {
  let component: CouponsModalComponent;
  let fixture: ComponentFixture<CouponsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
