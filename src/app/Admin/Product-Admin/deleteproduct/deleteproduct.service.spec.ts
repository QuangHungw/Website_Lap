import { TestBed } from '@angular/core/testing';

import { DeleteproductService } from './deleteproduct.service';

describe('DeleteproductService', () => {
  let service: DeleteproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
