import { TestBed } from '@angular/core/testing';

import { DeletecategoryService } from './deletecategory.service';

describe('DeletecategoryService', () => {
  let service: DeletecategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletecategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
