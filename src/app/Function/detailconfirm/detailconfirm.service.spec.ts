import { TestBed } from '@angular/core/testing';

import { DetailconfirmService } from './detailconfirm.service';

describe('DetailconfirmService', () => {
  let service: DetailconfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailconfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
