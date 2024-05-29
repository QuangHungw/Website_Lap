import { TestBed } from '@angular/core/testing';

import { OrderconfirmdetailService } from './orderconfirmdetail.service';

describe('OrderconfirmdetailService', () => {
  let service: OrderconfirmdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderconfirmdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
