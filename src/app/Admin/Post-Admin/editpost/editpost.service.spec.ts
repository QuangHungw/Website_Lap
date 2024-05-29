import { TestBed } from '@angular/core/testing';

import { EditpostService } from './editpost.service';

describe('EditpostService', () => {
  let service: EditpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
