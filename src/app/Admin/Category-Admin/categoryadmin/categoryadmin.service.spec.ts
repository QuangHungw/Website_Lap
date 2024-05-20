import { TestBed } from '@angular/core/testing';

import { CategoryadminService } from './categoryadmin.service';

describe('CategoryadminService', () => {
  let service: CategoryadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
