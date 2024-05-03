import { TestBed } from '@angular/core/testing';

import { CustomeradminService } from './customeradmin.service';

describe('CustomeradminService', () => {
  let service: CustomeradminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomeradminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
