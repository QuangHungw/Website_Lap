import { TestBed } from '@angular/core/testing';

import { ProductadminService } from './productadmin.service';

describe('ProductadminService', () => {
  let service: ProductadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
