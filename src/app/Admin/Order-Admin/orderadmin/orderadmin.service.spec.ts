import { TestBed } from '@angular/core/testing';

import { OrderadminService } from './orderadmin.service';

describe('OrderService', () => {
  let service: OrderadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
