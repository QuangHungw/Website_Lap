import { TestBed } from '@angular/core/testing';

import { WebLapService } from './web-lap.service';

describe('WebLapService', () => {
  let service: WebLapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebLapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
