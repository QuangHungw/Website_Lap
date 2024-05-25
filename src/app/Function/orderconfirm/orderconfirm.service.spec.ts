import { TestBed } from '@angular/core/testing';

import { OrderconfirmService } from './orderconfirm.service';

describe('OrderconfirmService', () => {
  let service: OrderconfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderconfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
