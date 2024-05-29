import { TestBed } from '@angular/core/testing';

import { PostadminService } from './postadmin.service';

describe('PostadminService', () => {
  let service: PostadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
