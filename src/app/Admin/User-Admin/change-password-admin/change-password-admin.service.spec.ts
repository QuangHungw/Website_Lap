import { TestBed } from '@angular/core/testing';

import { ChangePasswordAdminService } from './change-password-admin.service';

describe('ChangePasswordAdminService', () => {
  let service: ChangePasswordAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
