import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentComponent } from './admin-payment.component';

describe('AdminPaymentComponent', () => {
  let component: AdminPaymentComponent;
  let fixture: ComponentFixture<AdminPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
