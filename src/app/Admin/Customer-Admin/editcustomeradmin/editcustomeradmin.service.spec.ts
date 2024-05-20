import { TestBed } from '@angular/core/testing';

import { EditcustomeradminService } from './editcustomeradmin.service';

describe('EditcustomeradminService', () => {
  let service: EditcustomeradminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditcustomeradminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
