import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmdetailComponent } from './orderconfirmdetail.component';

describe('OrderconfirmdetailComponent', () => {
  let component: OrderconfirmdetailComponent;
  let fixture: ComponentFixture<OrderconfirmdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderconfirmdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderconfirmdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
